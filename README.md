<!--
  Hour Halo
  Offline Hours-&-Budget Tracker
  ✔︎ HTML  ✔︎ CSS  ✔︎ JavaScript  ✔︎ Capacitor iOS Wrapper
-->

# Hour Halo

Hour Halo is a **100% offline** part-time earnings & spending tracker that looks
and feels like a native iOS app—but the entire UI is built with
**HTML / CSS / JS** and shipped inside an **Apple-approved Capacitor wrapper**.

> • No backend, no sign-in, no analytics  
> • Data is stored locally in **IndexedDB** (via Dexie.js)  
> • The same codebase can be published as a **PWA** or wrapped for **iOS**  
>   (and Android, if you ever want)

---

## ✨ Feature Overview

| Area                | What it does                                                            |
|---------------------|-------------------------------------------------------------------------|
| **Week View**       | Quick pills to enter hours per weekday + Copy/Clear actions             |
| **Summary**         | Budget / Spent / Left card & a stacked Chart.js graph (Base vs Tips)    |
| **Spend**           | Expense list with categories, floating "+" FAB, weekly budget           |
| **History**         | Infinite scroll of past weeks; tap to reopen & edit                     |
| **Settings**        | Default hourly rate, currency, tips toggle, reminder time, CSV export   |

---

## 📱 User Flow & Screens

### 1. Onboarding Flow
- **First Launch**: Welcome screen with app introduction
- **Initial Setup**: Set hourly rate, currency preference, and weekly budget
- **Permissions**: Request notification permissions for reminders

### 2. Main Navigation
- **Tab Bar**: Week, Summary, Spend, History, Settings
- **Default View**: Current week view on app launch
- **Navigation Pattern**: Bottom tab bar for main sections

### 3. Week View Flow
- **Default State**: Current week with empty hour pills
- **Hour Entry**: Tap pill to enter hours for each day
- **Quick Actions**: 
  - Copy previous day/week
  - Clear day/week
  - Add tips (optional)
- **Auto-calculation**: Earnings update in real-time based on hourly rate

### 4. Summary Flow
- **Overview Card**: Budget, Spent, Remaining amounts
- **Visualization**: Weekly chart showing:
  - Earnings (base + tips if enabled)
  - Expenses by category
  - Net balance
- **Time Period**: Toggle between current week, month, or custom range

### 5. Spend Flow
- **Expense List**: Categorized list of expenses
- **Add Expense**: FAB opens modal with:
  - Amount
  - Category selection
  - Date
  - Notes
- **Budget Management**: Visual indicator of budget status
- **Edit/Delete**: Swipe actions on expense items

### 6. History Flow
- **Week List**: Scrollable list of past weeks
- **Week Card**: Shows total hours, earnings, expenses
- **Interaction**: Tap to view/edit past week data
- **Search/Filter**: Find specific weeks or filter by criteria

### 7. Settings Flow
- **Preferences**: 
  - Hourly rate
  - Currency
  - Tips toggle
  - Weekly budget
- **Notifications**: Set reminder time
- **Data Management**:
  - Export data (CSV)
  - Clear history
  - Backup/restore

---

## 🛠 Tech Stack

| Layer               | Choice                    | Why                                                            |
|---------------------|---------------------------|----------------------------------------------------------------|
| **Frontend**        | Vanilla JS + [Lit]        | Tiny runtime, web-component friendly                           |
| **Styling**         | [Tailwind CSS]            | Utility classes = fast, themeable                              |
| **Charts**          | [Chart.js v4]             | Lightweight, works in Capacitor WKWebView                      |
| **Storage**         | [Dexie.js] (IndexedDB)    | ACID-like, easy queries, offline by design                     |
| **iOS Wrapper**     | **Capacitor v5**          | First-class Xcode integration, Swift plugins                   |
| **Notifications**   | Capacitor `LocalNotifications` | Daily "Log your tips" reminder                            |

> _No Node server, no Cordova—pure static assets + Capacitor native shell._

---

## 📂 Folder Structure

hour-halo/
├── public/
│   ├── index.html
│   ├── icons/                # iOS + PWA icons & splashes
│   └── manifest.webmanifest
├── src/
│   ├── components/           # Lit web-components
│   │   ├── week-view.js
│   │   ├── summary-view.js
│   │   ├── spend-view.js
│   │   ├── history-view.js
│   │   ├── settings-view.js
│   │   ├── onboarding-view.js
│   │   └── shared/           # Reusable components
│   │       ├── hour-pill.js
│   │       ├── expense-item.js
│   │       ├── chart-card.js
│   │       └── modal.js
│   ├── db/                   # Dexie schema & seed data
│   │   ├── db.js
│   │   ├── schema.js
│   │   └── migrations.js
│   ├── css/
│   │   ├── tailwind.css
│   │   └── animations.css
│   ├── js/
│   │   ├── router.js         # tiny hash router
│   │   ├── helpers.js
│   │   ├── storage.js        # localStorage for settings
│   │   └── notifications.js  # reminder logic
│   └── main.js               # bootstraps router & mounts components
├── capacitor.config.ts
├── package.json
└── README.md

---

## 🚀 Development Plan

### Phase 1: Setup & Core Structure
1. Initialize project with Vite
2. Set up Tailwind CSS
3. Create basic folder structure
4. Implement router and main navigation
5. Set up Dexie.js database schema

### Phase 2: Core Components
1. Build shared components (hour-pill, expense-item, etc.)
2. Implement Week View with hour entry functionality
3. Create Summary View with basic chart
4. Develop Spend View with expense list and add functionality
5. Build Settings View with basic preferences

### Phase 3: Advanced Features
1. Implement History View with infinite scroll
2. Add data visualization with Chart.js
3. Create onboarding flow
4. Implement notifications with Capacitor
5. Add CSV export functionality

### Phase 4: Polish & Optimization
1. Implement dark mode
2. Add animations and transitions
3. Optimize performance
4. Add error handling and data validation
5. Implement offline fallbacks

### Phase 5: Testing & Deployment
1. Test on multiple devices and browsers
2. Package as PWA
3. Build iOS app with Capacitor
4. Prepare for App Store submission
5. Create documentation

---

## 🧩 Key Implementation Notes

| Concern | Solution |
|---------|----------|
| Local DB | db.js creates weeks & expenses tables; components query via Dexie live queries. |
| Reactive UI | Lit's reactive properties + Dexie table.hook('updating'). |
| Chart Refresh | Chart.js instance is rebuilt on reactive change. |
| FAB / Modals | Tailwind utilities + <dialog> element polyfill (still works in iOS 18). |
| Dark Mode | Tailwind dark: prefix + prefers-color-scheme. |
| Local Notifications | LocalNotifications.schedule via Capacitor plugin. |
| CSV Export | JS Blob → Filesystem.writeFile → Share.share() sheet. |
| Onboarding | localStorage to track first launch + guided setup. |
| Offline Support | Service worker for PWA + IndexedDB for data persistence. |
| Navigation | Hash-based routing with history API fallback. |

---

## 📊 Data Models

### Week Model
```javascript
{
  id: 'YYYY-MM-DD', // ISO date of week start (Monday)
  days: {
    mon: { hours: 0, tips: 0 },
    tue: { hours: 0, tips: 0 },
    wed: { hours: 0, tips: 0 },
    thu: { hours: 0, tips: 0 },
    fri: { hours: 0, tips: 0 },
    sat: { hours: 0, tips: 0 },
    sun: { hours: 0, tips: 0 }
  },
  notes: '',
  totalHours: 0,
  totalTips: 0,
  totalEarnings: 0
}
```

### Expense Model
```javascript
{
  id: 'auto-increment',
  weekId: 'YYYY-MM-DD', // Reference to week
  amount: 0,
  category: '', // Food, Transport, etc.
  date: 'YYYY-MM-DD',
  notes: '',
  createdAt: Date
}
```

### Settings Model
```javascript
{
  hourlyRate: 15,
  currency: 'USD',
  showTips: true,
  weeklyBudget: 200,
  reminderTime: '19:00',
  theme: 'system' // light, dark, system
}
```
