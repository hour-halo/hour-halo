/**
 * Simple hash-based router for Hour Halo
 */

// Available routes
const routes = ['week', 'summary', 'spend', 'history', 'settings'];

// Default route
const defaultRoute = 'week';

// Router class
export class Router {
  constructor() {
    this.currentRoute = 'week'; // Set default route to 'week'
    this.listeners = [];

    // Handle hash changes
    window.addEventListener('hashchange', () => this.handleRouteChange());

    // We don't need to immediately handle the route on initialization
    // as we're directly rendering the Week view in initApp
  }

  // Get current route from URL hash
  handleRouteChange() {
    // Get route from hash (remove # symbol)
    let route = window.location.hash.substring(1);

    // If no route or invalid route, use default
    if (!route || !routes.includes(route)) {
      route = defaultRoute;

      // Only navigate if we need to (to avoid infinite loops)
      if (window.location.hash !== `#${route}`) {
        this.navigate(route);
        return; // Navigation will trigger another handleRouteChange
      }
    }

    // Update current route
    this.currentRoute = route;

    // Notify listeners
    this.notifyListeners();
  }

  // Navigate to a route
  navigate(route) {
    window.location.hash = route;
  }

  // Add route change listener
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remove route change listener
  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  // Notify all listeners of route change
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentRoute));
  }
}

// Create and export router instance
const router = new Router();
export default router;
