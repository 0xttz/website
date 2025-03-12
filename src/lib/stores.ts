import { writable, derived } from 'svelte/store';

// Define the route position type
type Position = { x: number; y: number };
// Define valid route keys
type RouteKey = '/projects' | '/' | '/thoughts' | '/recommendations' | '/projects/';

// Routes mapped to their positions (conceptually in a 2D grid)
const routePositions: Record<RouteKey, Position> = {
  '/projects': { x: 0, y: 0 },
  '/': { x: 1, y: 0 },
  '/thoughts': { x: 2, y: 0 },
  '/recommendations': { x: 3, y: 0 },
  // Project detail pages are below the projects page
  '/projects/': { x: 0, y: 1 }
};

// Create a store to track the current and previous paths
export const currentPath = writable('');
export const previousPath = writable('');

// Function to get the root path from a full path
function getRootPath(path: string): string {
  // Get the first part of the path
  const segments = path.split('/');
  if (segments.length >= 2) {
    // If path is like /projects/something, we need special handling
    if (segments[1] === 'projects' && segments.length > 2) {
      return '/projects/';
    }
    return '/' + segments[1];
  }
  return path;
}

// Derived store that determines the navigation direction
export const navigationDirection = derived(
  [currentPath, previousPath],
  ([$currentPath, $previousPath]) => {
    if (!$previousPath || $currentPath === $previousPath) return { x: 0, y: 0, direction: 'none' as const };

    const currentRoot = getRootPath($currentPath);
    const previousRoot = getRootPath($previousPath);
    
    // Special case for project detail pages - check this first
    if ($currentPath.startsWith('/projects/') && $previousPath === '/projects') {
      return {
        x: 0,
        y: 1, // Positive y means animate from bottom
        direction: 'vertical' as const
      };
    } else if ($currentPath === '/projects' && $previousPath.startsWith('/projects/')) {
      return {
        x: 0,
        y: -1, // Negative y means animate from top
        direction: 'vertical' as const
      };
    }
    
    // Get positions or default to origin
    const currentPos = (routePositions[currentRoot as RouteKey] || { x: 0, y: 0 });
    const previousPos = (routePositions[previousRoot as RouteKey] || { x: 0, y: 0 });
    
    // Calculate the movement vector
    const deltaX = currentPos.x - previousPos.x;
    const deltaY = currentPos.y - previousPos.y;
    
    return {
      // Normalized to -1, 0, or 1
      x: Math.sign(deltaX),
      y: Math.sign(deltaY),
      // For backward compatibility
      direction: deltaX > 0 ? 'next' as const : deltaX < 0 ? 'prev' as const : (deltaY !== 0 ? 'vertical' as const : 'none' as const)
    };
  }
);

// Helper function to get animation properties based on direction
export function getAnimationProps(duration = 250, delay = 0) {
  return {
    // For fly transitions: x movement (reduced from 60 to 40 for faster transitions)
    getX: (multiplier = 1) => derived(
      navigationDirection, 
      ($dir) => $dir.x * -40 * multiplier
    ),
    // For fly transitions: y movement (reduced from 60 to 40 for faster transitions)
    getY: (multiplier = 1) => derived(
      navigationDirection, 
      ($dir) => $dir.y * -40 * multiplier
    ),
    // For crossfade/main transitions (reduced from 150 to 100 for faster transitions)
    getCrossfadeX: (multiplier = 1) => derived(
      navigationDirection, 
      ($dir) => $dir.x * -100 * multiplier
    ),
    // Standard durations and delays
    duration,
    delay
  };
}

// Export a simple version of the navigation direction for backward compatibility
export const navigationDirectionLegacy = derived(
  navigationDirection,
  ($dir) => $dir.direction === 'next' ? 'next' : 'prev'
); 