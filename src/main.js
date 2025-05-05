import './style.css';
import './css/animations.css';
import './css/ios-styles.css';
import './css/ios-week-header.css';
import './css/fix-white-boxes.css';
import './css/ios-nav-direct.css';
import './css/input-fixes.css';
import './css/ios-native-buttons.css';
import './css/safe-areas.css';
import { html, render } from 'lit';
import router from './js/router.js';
import db, { initializeDatabase, createWeek, getCurrentWeekId } from './db/db.js';
import { isFirstLaunch, markAsLaunched } from './js/storage.js';
import { applyTheme } from './js/helpers.js';
import { updateHourlyRate } from './js/update-hourly-rate.js';
import { forceLightMode } from './js/force-light-mode.js';

// Import components
import './components/week-view.js';
import './components/summary-view.js';
// Temporarily comment out original spend-view
// import './components/spend-view.js';
import './components/history-view.js';
import './components/settings-view.js';
// import './components/onboarding-view.js';
import './components/diagnostic-view.js';
import './components/spend-view-simple.js';
import './components/spend-view-new.js';
import './components/test-fixed-expenses-view.js';

// App initialization
async function initApp() {
  try {
    // Initialize database
    await initializeDatabase();

    // Create current week if it doesn't exist
    await createWeek(getCurrentWeekId());

    // Check if this is the first launch
    const firstLaunch = isFirstLaunch();
    if (firstLaunch) {
      console.log('First launch detected');
      // Will show onboarding when component is implemented
      markAsLaunched();
    }

    // Update hourly rate to $10.00
    await updateHourlyRate();

    // Apply theme from settings
    const settings = await db.settings.get(1);

    // Force light mode for all modals and components
    await forceLightMode();

    // Apply theme from settings for the main app
    applyTheme(settings.theme);

    // Render app shell
    renderAppShell();

    // Get the default view from settings
    const defaultView = settings.defaultView || 'week';

    // Directly render the default view first, before setting up the router
    // This ensures the view is shown on initial load
    renderView(defaultView);

    // Set the active tab for the default view
    const activeTab = document.getElementById(`tab-${defaultView}`);
    if (activeTab) {
      activeTab.classList.add('active');
    }

    // Update header title for the default view
    const headerTitle = document.querySelector('.ios-header h1');
    if (headerTitle) {
      switch (defaultView) {
        case 'week':
          headerTitle.textContent = 'This Week';
          break;
        case 'summary':
          headerTitle.textContent = 'Summary';
          break;
        case 'spend':
          headerTitle.textContent = 'Spend';
          break;
        case 'history':
          headerTitle.textContent = 'History';
          break;
        case 'settings':
          headerTitle.textContent = 'Settings';
          break;
        default:
          headerTitle.textContent = 'Hour Halo';
      }
    }

    // Set up router for subsequent navigation
    setupRouter();

    console.log('Hour Halo initialized successfully');
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}

// Render app shell with navigation
function renderAppShell() {
  const appElement = document.querySelector('#app');

  const template = html`
    <div class="flex flex-col h-screen safe-area-all">
      <!-- iOS-style header with safe area insets -->
      <header class="ios-header safe-area-top dynamic-island-aware">
        <div class="flex justify-center items-center">
          <h1 class="text-lg font-semibold">Hour Halo</h1>
        </div>
      </header>

      <!-- Main content area with safe area insets -->
      <main class="flex-1 overflow-y-auto pb-28 safe-area-all">
        <div id="view-container" class="p-4 pb-20"></div>
      </main>

      <!-- iOS-style bottom navigation with safe area insets -->
      <nav class="ios-nav-bar safe-area-bottom">
        <div class="flex justify-around items-center h-16">
          <a href="#week" class="ios-nav-item" id="tab-week">
            <div class="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-xs mt-1">Week</span>
            </div>
          </a>
          <a href="#summary" class="ios-nav-item" id="tab-summary">
            <div class="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span class="text-xs mt-1">Summary</span>
            </div>
          </a>
          <a href="#spend" class="ios-nav-item" id="tab-spend">
            <div class="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-xs mt-1">Spend</span>
            </div>
          </a>
          <a href="#history" class="ios-nav-item" id="tab-history">
            <div class="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-xs mt-1">History</span>
            </div>
          </a>
          <a href="#settings" class="ios-nav-item" id="tab-settings">
            <div class="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-xs mt-1">Settings</span>
            </div>
          </a>
        </div>
      </nav>
    </div>
  `;

  render(template, appElement);
}

// Set up router to handle view changes
function setupRouter() {
  // Handle route changes
  router.addListener(route => {
    // Update active tab
    document.querySelectorAll('.ios-nav-item').forEach(tab => {
      tab.classList.remove('active');
    });

    const activeTab = document.getElementById(`tab-${route}`);
    if (activeTab) {
      activeTab.classList.add('active');
    }

    // Update header title based on route
    const headerTitle = document.querySelector('.ios-header h1');
    if (headerTitle) {
      // Set title based on route
      switch (route) {
        case 'week':
          headerTitle.textContent = 'This Week';
          break;
        case 'summary':
          headerTitle.textContent = 'Summary';
          break;
        case 'spend':
          headerTitle.textContent = 'Spend';
          break;
        case 'history':
          headerTitle.textContent = 'History';
          break;
        case 'settings':
          headerTitle.textContent = 'Settings';
          break;
        default:
          headerTitle.textContent = 'Hour Halo';
      }
    }

    // Render view based on route
    renderView(route);
  });
}

// Render the appropriate view based on the current route
function renderView(route) {
  const viewContainer = document.getElementById('view-container');
  viewContainer.innerHTML = '';

  // Create and append the appropriate component based on the route
  switch (route) {
    case 'week':
      const weekView = document.createElement('week-view');
      viewContainer.appendChild(weekView);
      break;

    case 'summary':
      const summaryView = document.createElement('summary-view');
      viewContainer.appendChild(summaryView);
      break;

    case 'spend':
      // Use the new spend view implementation
      const spendViewNew = document.createElement('spend-view-new');
      viewContainer.appendChild(spendViewNew);
      break;

    case 'history':
      const historyView = document.createElement('history-view');
      viewContainer.appendChild(historyView);
      break;

    case 'test-fixed-expenses':
      const testFixedExpensesView = document.createElement('test-fixed-expenses-view');
      viewContainer.appendChild(testFixedExpensesView);
      break;

    case 'settings':
      const settingsView = document.createElement('settings-view');
      viewContainer.appendChild(settingsView);
      break;

    default:
      // Placeholder for views that are not yet implemented
      const placeholderTemplate = html`
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-fade-in">
          <h2 class="text-2xl font-bold mb-4">${route.charAt(0).toUpperCase() + route.slice(1)} View</h2>
          <p class="text-gray-600 dark:text-gray-300">
            This view is coming soon.
          </p>
        </div>
      `;
      render(placeholderTemplate, viewContainer);
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
