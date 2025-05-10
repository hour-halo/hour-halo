/**
 * Summary View Component
 * Displays aggregated data and charts for earnings and hours
 */

import { LitElement, html, css } from 'lit';
import { formatCurrency, getWeekRangeString, getMonthRangeString } from '../js/helpers.js';
import db from '../db/db.js';

// Import chart components
import './shared/summary-charts.js';
import './shared/expense-pie-chart.js';

export class SummaryView extends LitElement {
  static properties = {
    period: { type: String }, // 'week', 'month', 'year'
    summaryData: { type: Object },
    isLoading: { type: Boolean },
    settings: { type: Object },
    currentDate: { type: Object }, // For navigation
  };

  static styles = css`
    :host {
      display: block;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .section-title {
      font-size: 17px;
      font-weight: 600;
      color: #000000;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .period-selector {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      background-color: rgba(142, 142, 147, 0.12);
      border-radius: 8px;
      padding: 2px;
    }

    .period-option {
      flex: 1;
      text-align: center;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 500;
      color: #8e8e93;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .period-option.active {
      background-color: #ffffff;
      color: #000000;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .summary-card {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
    }

    /* Style for future projection cards */
    .future-projection {
      border: 2px solid rgba(0, 122, 255, 0.3);
    }

    .future-projection::before {
      content: "Projection";
      position: absolute;
      top: 8px;
      right: 8px;
      background-color: rgba(0, 122, 255, 0.1);
      color: #007aff;
      font-size: 10px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .card-title {
      font-size: 15px;
      font-weight: 600;
      color: #8e8e93;
      margin-bottom: 8px;
    }

    .amount-large {
      font-size: 32px;
      font-weight: 700;
      color: #000000;
      margin-bottom: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .amount-positive {
      color: #34c759;
    }

    .amount-negative {
      color: #ff3b30;
    }

    .breakdown {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
    }

    .breakdown-item {
      text-align: center;
    }

    .breakdown-label {
      font-size: 13px;
      color: #8e8e93;
      margin-bottom: 4px;
    }

    .breakdown-value {
      font-size: 17px;
      font-weight: 600;
      color: #000000;
    }

    .percentage {
      font-size: 13px;
      color: #8e8e93;
      margin-left: 4px;
    }

    .chart-container {
      height: 200px;
      margin-top: 16px;
      position: relative;
    }

    .placeholder-chart {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      background-color: rgba(142, 142, 147, 0.12);
      border-radius: 8px;
      color: #8e8e93;
      font-size: 15px;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      color: #8e8e93;
    }

    .date-navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .date-range {
      font-size: 15px;
      font-weight: 600;
      color: #000000;
    }

    /* Style for future dates */
    .future-date {
      color: #007aff;
      font-weight: 700;
    }

    /* Style for past dates */
    .past-date {
      color: #8e8e93;
    }

    .nav-arrow {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: rgba(142, 142, 147, 0.12);
      cursor: pointer;
    }

    .nav-arrow svg {
      width: 16px;
      height: 16px;
      stroke: #8e8e93;
    }
  `;

  constructor() {
    super();
    this.period = 'week'; // Default to weekly view
    this.summaryData = null;
    this.isLoading = true;
    this.settings = {
      hourlyRate: 10,
      currency: 'USD',
      showTips: true
    };

    // Initialize current date for navigation
    this.currentDate = new Date();
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadSettings();
    this.loadSummaryData();
  }

  async loadSettings() {
    try {
      const settings = await db.settings.get(1);
      if (settings) {
        this.settings = settings;
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }

  async loadSummaryData() {
    this.isLoading = true;

    try {
      let data;

      if (this.period === 'week') {
        data = await this.loadWeekData(this.currentDate);
      } else if (this.period === 'month') {
        data = await this.loadMonthData(this.currentDate);
      } else if (this.period === 'year') {
        // For year view, we'll aggregate data for the entire year
        data = await this.loadYearData(this.currentDate);
      }

      this.summaryData = data;
    } catch (error) {
      console.error('Error loading summary data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // Dedicated function for loading last month data
  async loadLastMonthData() {
    console.log("Loading last month data");

    try {
      // Get the current date and set to the beginning of the day
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      // Get the first day of the current month
      const firstDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      firstDayOfCurrentMonth.setHours(0, 0, 0, 0);

      console.log(`First day of current month: ${firstDayOfCurrentMonth.toISOString()}`);

      // Calculate the last month
      // We'll use the first day of the current month and subtract one day to get the last day of the previous month
      const lastDayOfLastMonth = new Date(firstDayOfCurrentMonth);
      lastDayOfLastMonth.setDate(lastDayOfLastMonth.getDate() - 1);

      // Now get the first day of the last month
      const firstDayOfLastMonth = new Date(lastDayOfLastMonth.getFullYear(), lastDayOfLastMonth.getMonth(), 1);
      firstDayOfLastMonth.setHours(0, 0, 0, 0);

      // Get the year and month for the last month
      const year = firstDayOfLastMonth.getFullYear();
      const month = firstDayOfLastMonth.getMonth();

      console.log(`Last month is: ${year}-${month+1}`);
      console.log(`First day of last month: ${firstDayOfLastMonth.toISOString()}`);
      console.log(`Last day of last month: ${lastDayOfLastMonth.toISOString()}`);

      // Get all weeks from the database
      const allWeeks = await db.weeks.toArray();
      console.log(`Total weeks in database: ${allWeeks.length}`);

      // Aggregate data
      let totalHours = 0;
      let totalTips = 0;
      let daysWorked = 0;
      const dailyData = {};

      // Process each week
      for (const week of allWeeks) {
        console.log(`Checking week: ${week.id}`);

        // Process daily data if available
        if (week.days) {
          for (const [dayKey, dayData] of Object.entries(week.days)) {
            try {
              // Get the actual date for this day
              const dayDate = this.getDayDateFromWeekAndDayKey(week.id, dayKey);

              if (!dayDate) {
                console.log(`Skipping day ${dayKey} - could not determine date`);
                continue;
              }

              // Set to beginning of day for consistent comparison
              const dayDateNormalized = new Date(dayDate);
              dayDateNormalized.setHours(0, 0, 0, 0);

              // Get the month and year of this day
              const dayMonth = dayDateNormalized.getMonth();
              const dayYear = dayDateNormalized.getFullYear();

              // Only include days that are in the last month
              // Explicitly check if the day's month and year match the last month
              if (dayMonth === month && dayYear === year) {
                console.log(`Including day ${dayKey} (${dayDateNormalized.toISOString()}) with hours: ${dayData.hours}`);

                // Add hours and tips to totals
                const hours = dayData.hours || 0;
                const tips = dayData.tips || 0;

                if (hours > 0) {
                  totalHours += hours;
                  totalTips += tips;
                  daysWorked++;

                  // Add to daily data for chart
                  const dayName = this.getDayNameFromKey(dayKey);
                  if (!dailyData[dayName]) {
                    dailyData[dayName] = { hours: 0, tips: 0 };
                  }

                  dailyData[dayName].hours += hours;
                  dailyData[dayName].tips += tips;
                }
              } else {
                console.log(`Excluding day ${dayKey} (${dayDateNormalized.toISOString()}) - month: ${dayMonth+1}, year: ${dayYear}, expected: ${month+1}/${year}`);
              }
            } catch (error) {
              console.error(`Error processing day ${dayKey} in week ${week.id}:`, error);
            }
          }
        }
      }

      console.log(`Last month totals - Hours: ${totalHours}, Tips: ${totalTips}, Days worked: ${daysWorked}`);
      console.log("Daily data for charts:", dailyData);

      // Calculate averages
      const avgHoursPerDay = daysWorked > 0 ? totalHours / daysWorked : 0;
      const basePay = totalHours * this.settings.hourlyRate;
      const totalEarnings = basePay + (this.settings.showTips ? totalTips : 0);
      const avgEarningsPerDay = daysWorked > 0 ? totalEarnings / daysWorked : 0;

      // Convert daily data to array format for charts
      const dailyDataArray = Object.entries(dailyData).map(([day, data]) => {
        return {
          day,
          hours: data.hours,
          earnings: data.hours * this.settings.hourlyRate + (this.settings.showTips ? data.tips : 0)
        };
      });

      // Sort by day of week
      const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      dailyDataArray.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

      // Get the month name for display
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
      const monthName = monthNames[month];

      return {
        period: 'lastMonth',
        dateRange: `Last Month (${monthName} ${year})`,
        totalHours,
        totalEarnings,
        totalTips,
        basePay,
        daysWorked,
        avgHoursPerDay,
        avgEarningsPerDay,
        dailyData: dailyDataArray
      };
    } catch (error) {
      console.error("Error in loadLastMonthData:", error);
      return this.createEmptySummaryData('lastMonth');
    }
  }

  async loadWeekData(date = new Date()) {
    // Clone the date to avoid modifying the original
    const workingDate = new Date(date);

    // Get week ID for the specified date
    const day = workingDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const diff = workingDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust to get Monday
    const monday = new Date(workingDate);
    monday.setDate(diff);
    monday.setHours(0, 0, 0, 0); // Set to beginning of day
    const weekId = monday.toISOString().split('T')[0];

    console.log(`Loading week data for date: ${workingDate.toISOString()}`);
    console.log(`Calculated Monday: ${monday.toISOString()}`);
    console.log(`Week ID: ${weekId}`);

    // Load the week data
    const week = await db.weeks.get(weekId);
    console.log("Week data retrieved:", week);

    // Get the current date for comparison
    const now = new Date();
    const isPastWeek = monday < now;
    const isFutureWeek = monday > now;

    // Format date range for display
    const weekRangeString = getWeekRangeString(weekId);

    if (!week) {
      console.log("No week data found, returning empty data");
      // Create empty data with appropriate date range
      return {
        ...this.createEmptySummaryData(),
        period: 'week',
        dateRange: isPastWeek ? `Past: ${weekRangeString}` :
                  isFutureWeek ? `Future: ${weekRangeString}` :
                  weekRangeString
      };
    }

    // Calculate daily averages
    const daysWorked = Object.values(week.days).filter(day => day.hours > 0).length;
    const avgHoursPerDay = daysWorked > 0 ? week.totalHours / daysWorked : 0;
    const avgEarningsPerDay = daysWorked > 0 ?
      (week.totalHours * this.settings.hourlyRate + (this.settings.showTips ? week.totalTips : 0)) / daysWorked : 0;

    console.log(`Days worked: ${daysWorked}, Avg hours: ${avgHoursPerDay}, Avg earnings: ${avgEarningsPerDay}`);

    // Create daily data for charts - sort by day of week
    const dailyData = Object.entries(week.days)
      .map(([dayKey, dayData]) => {
        return {
          dayKey,
          day: this.getDayNameFromKey(dayKey),
          hours: dayData.hours || 0,
          tips: dayData.tips || 0,
          earnings: (dayData.hours || 0) * this.settings.hourlyRate + (this.settings.showTips ? (dayData.tips || 0) : 0)
        };
      })
      .sort((a, b) => {
        const dayOrder = { 'mon': 0, 'tue': 1, 'wed': 2, 'thu': 3, 'fri': 4, 'sat': 5, 'sun': 6 };
        return dayOrder[a.dayKey] - dayOrder[b.dayKey];
      });

    console.log("Daily data for charts:", dailyData);

    // Format date range for display with past/future indicators
    const formattedDateRange = isPastWeek ? `Past: ${weekRangeString}` :
                              isFutureWeek ? `Future: ${weekRangeString}` :
                              weekRangeString;
    console.log(`Date range: ${formattedDateRange}`);

    // Expense data loading is temporarily disabled
    console.log("Expense data loading is temporarily disabled");

    // Create the base summary data without expense data
    const summaryData = {
      period: 'week',
      dateRange: formattedDateRange,
      totalHours: week.totalHours || 0,
      totalEarnings: (week.totalHours || 0) * this.settings.hourlyRate + (this.settings.showTips ? (week.totalTips || 0) : 0),
      totalTips: week.totalTips || 0,
      basePay: (week.totalHours || 0) * this.settings.hourlyRate,
      daysWorked,
      avgHoursPerDay,
      avgEarningsPerDay,
      dailyData
    };

    return summaryData;
  }

  async loadMonthData(date = new Date()) {
    // Clone the date to avoid modifying the original
    const workingDate = new Date(date);

    // Get month from the provided date
    const year = workingDate.getFullYear();
    const month = workingDate.getMonth();

    console.log(`Loading month data for: ${year}-${month+1} (${workingDate.toISOString()})`);

    // Get all weeks in the current month
    const weeks = await this.getWeeksInMonth(year, month);
    console.log(`Found ${weeks.length} weeks in month ${year}-${month+1}`);

    // Get the current date for comparison
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Determine if this is a past or future month
    const isPastMonth = (year < currentYear) || (year === currentYear && month < currentMonth);
    const isFutureMonth = (year > currentYear) || (year === currentYear && month > currentMonth);

    // Get the appropriate date range string
    const dateRange = getMonthRangeString(new Date(year, month, 1), true);
    const formattedDateRange = isPastMonth ? `Past: ${dateRange}` :
                              isFutureMonth ? `Future: ${dateRange}` :
                              dateRange;

    if (weeks.length === 0) {
      console.log("No weeks found in month, returning empty data");
      return {
        ...this.createEmptySummaryData(this.period === 'lastMonth' ? 'lastMonth' : 'month'),
        dateRange: formattedDateRange
      };
    }

    // Aggregate data from all weeks
    let totalHours = 0;
    let totalTips = 0;
    let daysWorked = 0;

    // Create a map to store daily data
    const dailyData = {};

    // Process each week
    for (const week of weeks) {
      console.log(`Processing week: ${week.id}`);
      totalHours += week.totalHours || 0;
      totalTips += week.totalTips || 0;

      // Process daily data
      if (week.days) {
        for (const [dayKey, dayData] of Object.entries(week.days)) {
          // Check if this day falls within the current month
          const dayDate = this.getDayDateFromWeekAndDayKey(week.id, dayKey);

          if (dayDate && dayDate.getMonth() === month && dayDate.getFullYear() === year) {
            console.log(`Processing day ${dayKey} (${dayDate.toISOString()}) with hours: ${dayData.hours}`);

            if (dayData.hours > 0) {
              daysWorked++;

              // Add to daily data for chart
              const dayName = this.getDayNameFromKey(dayKey);
              if (!dailyData[dayName]) {
                dailyData[dayName] = { hours: 0, tips: 0 };
              }

              dailyData[dayName].hours += dayData.hours || 0;
              dailyData[dayName].tips += dayData.tips || 0;
            }
          } else if (dayDate) {
            console.log(`Skipping day ${dayKey} (${dayDate.toISOString()}) as it's not in the target month`);
          }
        }
      }
    }

    console.log(`Total hours: ${totalHours}, Total tips: ${totalTips}, Days worked: ${daysWorked}`);
    console.log("Daily data aggregated:", dailyData);

    // Calculate averages
    const avgHoursPerDay = daysWorked > 0 ? totalHours / daysWorked : 0;
    const basePay = totalHours * this.settings.hourlyRate;
    const totalEarnings = basePay + (this.settings.showTips ? totalTips : 0);
    const avgEarningsPerDay = daysWorked > 0 ? totalEarnings / daysWorked : 0;

    // Convert daily data to array format for charts
    const dailyDataArray = Object.entries(dailyData).map(([day, data]) => {
      return {
        day,
        hours: data.hours,
        earnings: data.hours * this.settings.hourlyRate + (this.settings.showTips ? data.tips : 0)
      };
    });

    // Sort by day of week
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    dailyDataArray.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

    console.log("Sorted daily data for charts:", dailyDataArray);

    // Determine if this is for the current month or last month
    const isLastMonth = this.period === 'lastMonth';
    console.log(`Is last month view: ${isLastMonth}`);

    // Adjust the formatted date range for last month view
    const finalDateRange = isLastMonth ? `Last Month (${dateRange})` : formattedDateRange;
    console.log(`Final date range: ${finalDateRange}`);

    // Expense data loading is temporarily disabled
    console.log("Expense data loading is temporarily disabled");

    // Create the base summary data without expense data
    const summaryData = {
      period: isLastMonth ? 'lastMonth' : 'month',
      dateRange: finalDateRange,
      totalHours,
      totalEarnings,
      totalTips,
      basePay,
      daysWorked,
      avgHoursPerDay,
      avgEarningsPerDay,
      dailyData: dailyDataArray
    };

    return summaryData;
  }

  // Helper method to get the actual date for a day in a week
  getDayDateFromWeekAndDayKey(weekId, dayKey) {
    try {
      // weekId is the Monday date of the week
      const monday = new Date(weekId);

      // Map day keys to offsets from Monday
      const dayOffsets = {
        'mon': 0,
        'tue': 1,
        'wed': 2,
        'thu': 3,
        'fri': 4,
        'sat': 5,
        'sun': 6
      };

      if (dayOffsets[dayKey] === undefined) {
        console.error(`Invalid day key: ${dayKey}`);
        return null;
      }

      // Create a new date by adding the offset to Monday
      const dayDate = new Date(monday);
      dayDate.setDate(monday.getDate() + dayOffsets[dayKey]);
      return dayDate;
    } catch (error) {
      console.error(`Error getting date for week ${weekId} and day ${dayKey}:`, error);
      return null;
    }
  }

  // Year data loading function
  async loadYearData(date = new Date()) {
    // Clone the date to avoid modifying the original
    const workingDate = new Date(date);

    // Get year from the provided date
    const year = workingDate.getFullYear();

    console.log(`Loading year data for: ${year}`);

    // Get all weeks from the database
    const allWeeks = await db.weeks.toArray();
    console.log(`Total weeks in database: ${allWeeks.length}`);

    // Get the current date for comparison
    const now = new Date();
    const currentYear = now.getFullYear();

    // Determine if this is a past or future year
    const isPastYear = year < currentYear;
    const isFutureYear = year > currentYear;

    // Create arrays to store monthly data for charts
    const monthlyHours = Array(12).fill(0);
    const monthlyEarnings = Array(12).fill(0);
    const monthlyTips = Array(12).fill(0);
    const monthsWithData = new Set();

    // Aggregate data
    let totalHours = 0;
    let totalTips = 0;
    let daysWorked = 0;

    // Process each week
    for (const week of allWeeks) {
      try {
        // Get the week's start date (Monday)
        const monday = new Date(week.id);

        // Process daily data if available
        if (week.days) {
          for (const [dayKey, dayData] of Object.entries(week.days)) {
            try {
              // Get the actual date for this day
              const dayDate = this.getDayDateFromWeekAndDayKey(week.id, dayKey);

              if (!dayDate) {
                console.log(`Skipping day ${dayKey} - could not determine date`);
                continue;
              }

              // Check if this day falls within the target year
              if (dayDate.getFullYear() === year) {
                const month = dayDate.getMonth();
                const hours = dayData.hours || 0;
                const tips = dayData.tips || 0;

                if (hours > 0) {
                  totalHours += hours;
                  totalTips += tips;
                  daysWorked++;

                  // Add to monthly data for charts
                  monthlyHours[month] += hours;
                  monthlyTips[month] += tips;
                  monthlyEarnings[month] += hours * this.settings.hourlyRate + (this.settings.showTips ? tips : 0);
                  monthsWithData.add(month);
                }
              }
            } catch (error) {
              console.error(`Error processing day ${dayKey} in week ${week.id}:`, error);
            }
          }
        }
      } catch (error) {
        console.error(`Error processing week ${week.id}:`, error);
      }
    }

    console.log(`Year totals - Hours: ${totalHours}, Tips: ${totalTips}, Days worked: ${daysWorked}`);

    // Calculate averages
    const avgHoursPerDay = daysWorked > 0 ? totalHours / daysWorked : 0;
    const basePay = totalHours * this.settings.hourlyRate;
    const totalEarnings = basePay + (this.settings.showTips ? totalTips : 0);
    const avgEarningsPerDay = daysWorked > 0 ? totalEarnings / daysWorked : 0;

    // Convert monthly data to array format for charts
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dailyDataArray = monthNames.map((month, index) => {
      return {
        day: month, // Using 'day' to be compatible with existing chart component
        hours: monthlyHours[index],
        earnings: monthlyEarnings[index]
      };
    });

    // Format date range for display with past/future indicators
    const formattedDateRange = isPastYear ? `Past: ${year}` :
                              isFutureYear ? `Future: ${year}` :
                              `${year}`;

    // If no data for this year, return empty data
    if (monthsWithData.size === 0) {
      console.log(`No data found for year ${year}, returning empty data`);
      return {
        ...this.createEmptySummaryData('year'),
        dateRange: formattedDateRange
      };
    }

    console.log("Monthly data for charts:", dailyDataArray);

    // Expense data loading is temporarily disabled
    console.log("Expense data loading is temporarily disabled");

    // Create the base summary data without expense data
    const summaryData = {
      period: 'year',
      dateRange: formattedDateRange,
      totalHours,
      totalEarnings,
      totalTips,
      basePay,
      daysWorked,
      avgHoursPerDay,
      avgEarningsPerDay,
      dailyData: dailyDataArray
    };

    return summaryData;
  }

  // Helper method to get all weeks in a month
  async getWeeksInMonth(year, month) {
    console.log(`Getting weeks in month: ${year}-${month+1}`);

    // Get all weeks from the database
    const allWeeks = await db.weeks.toArray();
    console.log(`Total weeks in database: ${allWeeks.length}`);

    // A week belongs to a month if any of its days fall within that month
    const weeksInMonth = allWeeks.filter(week => {
      // Check if this week has any days in the target month
      try {
        // The week ID is the Monday date
        const monday = new Date(week.id);

        // Check if any day in this week falls within our target month
        for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
          const currentDay = new Date(monday);
          currentDay.setDate(monday.getDate() + dayOffset);

          if (currentDay.getFullYear() === year && currentDay.getMonth() === month) {
            console.log(`Week ${week.id} has day ${currentDay.toISOString()} in target month`);
            return true;
          }
        }

        console.log(`Week ${week.id} has no days in target month ${year}-${month+1}`);
        return false;
      } catch (error) {
        console.error(`Error processing week ${week.id}:`, error);
        return false;
      }
    });

    console.log(`Found ${weeksInMonth.length} weeks with days in month ${year}-${month+1}`);
    return weeksInMonth;
  }

  createEmptySummaryData(period = 'week') {
    const currentYear = new Date().getFullYear();

    // Default expense categories
    const expenseCategories = [
      { category: 'Monthly Bills', amount: 0 },
      { category: 'Everyday Spending', amount: 0 },
      { category: 'Credit Cards', amount: 0 }
    ];

    return {
      period,
      dateRange: period === 'week' ? 'This Week' :
                period === 'month' ? 'This Month' :
                period === 'year' ? `${currentYear}` : 'No Data',
      totalHours: 0,
      totalEarnings: 0,
      totalTips: 0,
      basePay: 0,
      daysWorked: 0,
      avgHoursPerDay: 0,
      avgEarningsPerDay: 0,
      // Add expense data
      totalExpenses: 0,
      expenseCategories: expenseCategories,
      // Chart data
      dailyData: period === 'year' ?
        // For year view, create empty data for all 12 months
        ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          .map(month => ({ day: month, hours: 0, earnings: 0 })) :
        []
    };
  }

  getDayNameFromKey(key) {
    const dayMap = {
      'mon': 'Monday',
      'tue': 'Tuesday',
      'wed': 'Wednesday',
      'thu': 'Thursday',
      'fri': 'Friday',
      'sat': 'Saturday',
      'sun': 'Sunday'
    };
    return dayMap[key] || key;
  }

  handlePeriodChange(period) {
    console.log(`Changing period from ${this.period} to ${period}`);

    if (this.period !== period) {
      // Reset current date to today when switching period types
      if ((this.period === 'week' && (period === 'month' || period === 'year')) ||
          (this.period === 'month' && (period === 'week' || period === 'year')) ||
          (this.period === 'year' && (period === 'week' || period === 'month'))) {
        console.log("Resetting current date to today");
        this.currentDate = new Date();
      }

      // Update the period
      this.period = period;

      // Load the appropriate data
      this.loadSummaryData();
    }
  }

  navigatePrevious() {
    console.log("Navigating to previous period:", this.period);
    console.log("Current date before navigation:", this.currentDate);

    if (this.period === 'week') {
      // Go to previous week - no restrictions on how far back we can go
      const newDate = new Date(this.currentDate);
      newDate.setDate(newDate.getDate() - 7);
      this.currentDate = newDate;
      console.log("New date after navigation:", this.currentDate);
      this.loadSummaryData();
    } else if (this.period === 'month') {
      // Go to previous month - no restrictions on how far back we can go
      const newDate = new Date(this.currentDate);
      newDate.setMonth(newDate.getMonth() - 1);
      this.currentDate = newDate;
      console.log("New date after navigation:", this.currentDate);
      this.loadSummaryData();
    } else if (this.period === 'year') {
      // Go to previous year - no restrictions on how far back we can go
      const newDate = new Date(this.currentDate);
      newDate.setFullYear(newDate.getFullYear() - 1);
      this.currentDate = newDate;
      console.log("New date after navigation:", this.currentDate);
      this.loadSummaryData();
    }
  }


  navigateNext() {
    console.log("Navigating to next period:", this.period);
    console.log("Current date before navigation:", this.currentDate);

    // Get current date for comparison (only used to determine if we're in the future)
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normalize time for comparison

    if (this.period === 'week') {
      // Calculate the next week's start date - no restrictions on future navigation
      const newDate = new Date(this.currentDate);
      newDate.setDate(newDate.getDate() + 7);

      console.log("New date after navigation:", newDate);

      // Allow unlimited navigation into the future
      console.log("Navigating to next week");
      this.currentDate = newDate;
      this.loadSummaryData();
    } else if (this.period === 'month') {
      // Calculate next month - no restrictions on future navigation
      const newDate = new Date(this.currentDate);
      newDate.setMonth(newDate.getMonth() + 1);

      // Get the month and year of the new date
      const newMonth = newDate.getMonth();
      const newYear = newDate.getFullYear();

      console.log(`New month/year: ${newMonth+1}/${newYear}`);

      // Allow unlimited navigation into the future
      console.log("Navigating to next month");
      this.currentDate = newDate;
      this.loadSummaryData();
    } else if (this.period === 'year') {
      // Calculate next year - no restrictions on future navigation
      const newDate = new Date(this.currentDate);
      newDate.setFullYear(newDate.getFullYear() + 1);

      // Get the year of the new date
      const newYear = newDate.getFullYear();

      console.log(`New year: ${newYear}`);

      // Allow unlimited navigation into the future
      console.log("Navigating to next year");
      this.currentDate = newDate;
      this.loadSummaryData();
    }
  }

  render() {
    if (this.isLoading) {
      return html`
        <div class="loading">
          Loading summary data...
        </div>
      `;
    }

    return html`
      <!-- Period selector (iOS-style segmented control) -->
      <div class="period-selector">
        <div
          class="period-option ${this.period === 'week' ? 'active' : ''}"
          @click=${() => this.handlePeriodChange('week')}
        >
          Week
        </div>
        <div
          class="period-option ${this.period === 'month' ? 'active' : ''}"
          @click=${() => this.handlePeriodChange('month')}
        >
          Month
        </div>
        <div
          class="period-option ${this.period === 'year' ? 'active' : ''}"
          @click=${() => this.handlePeriodChange('year')}
        >
          Year
        </div>
      </div>

      <!-- Date navigation -->
      <div class="date-navigation">
        <div class="nav-arrow" @click=${() => this.navigatePrevious()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div class="date-range ${this.summaryData?.dateRange?.includes('Future:') ? 'future-date' :
                                this.summaryData?.dateRange?.includes('Past:') ? 'past-date' : ''}">
          ${this.summaryData?.dateRange || 'No data'}
        </div>
        <div class="nav-arrow" @click=${() => this.navigateNext()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <!-- Earnings summary card -->
      <div class="summary-card ${this.summaryData?.dateRange?.includes('Future:') ? 'future-projection' : ''}">
        <div class="card-title">Total Earnings</div>
        <div class="amount-large">
          ${formatCurrency(this.summaryData?.totalEarnings || 0, this.settings.currency)}
        </div>

        <div class="breakdown">
          <div class="breakdown-item">
            <div class="breakdown-label">Base Pay</div>
            <div class="breakdown-value">
              ${formatCurrency(this.summaryData?.basePay || 0, this.settings.currency)}
            </div>
          </div>

          ${this.settings.showTips ? html`
            <div class="breakdown-item">
              <div class="breakdown-label">Tips</div>
              <div class="breakdown-value">
                ${formatCurrency(this.summaryData?.totalTips || 0, this.settings.currency)}
              </div>
            </div>
          ` : ''}

          <div class="breakdown-item">
            <div class="breakdown-label">Per Day</div>
            <div class="breakdown-value">
              ${formatCurrency(this.summaryData?.avgEarningsPerDay || 0, this.settings.currency)}
            </div>
          </div>
        </div>

        <!-- Earnings chart -->
        <div class="chart-container">
          ${this.summaryData?.dailyData?.length > 0
            ? html`<summary-charts
                type="earnings"
                .data=${this.summaryData.dailyData}
                currency=${this.settings.currency}
              ></summary-charts>`
            : html`<div class="placeholder-chart">
                No earnings data available
              </div>`
          }
        </div>
      </div>

      <!-- Hours summary card -->
      <div class="summary-card ${this.summaryData?.dateRange?.includes('Future:') ? 'future-projection' : ''}">
        <div class="card-title">Hours Worked</div>
        <div class="amount-large">
          ${this.summaryData?.totalHours || 0}h
        </div>

        <div class="breakdown">
          <div class="breakdown-item">
            <div class="breakdown-label">Days Worked</div>
            <div class="breakdown-value">
              ${this.summaryData?.daysWorked || 0}
            </div>
          </div>

          <div class="breakdown-item">
            <div class="breakdown-label">Avg Per Day</div>
            <div class="breakdown-value">
              ${this.summaryData?.avgHoursPerDay?.toFixed(1) || 0}h
            </div>
          </div>

          <div class="breakdown-item">
            <div class="breakdown-label">Hourly Rate</div>
            <div class="breakdown-value">
              ${formatCurrency(this.settings.hourlyRate, this.settings.currency)}
            </div>
          </div>
        </div>

        <!-- Hours chart -->
        <div class="chart-container">
          ${this.summaryData?.dailyData?.length > 0
            ? html`<summary-charts
                type="hours"
                .data=${this.summaryData.dailyData}
                currency=${this.settings.currency}
              ></summary-charts>`
            : html`<div class="placeholder-chart">
                No hours data available
              </div>`
          }
        </div>
      </div>

      <!-- Expenses summary card - temporarily disabled until we fix the data issue -->
      <!-- We'll re-enable this once we've fixed the underlying data issue -->
      ${false ? html`
        <div class="summary-card ${this.summaryData?.dateRange?.includes('Future:') ? 'future-projection' : ''}">
          <div class="card-title">Total Spending</div>
          <div class="amount-large">
            ${formatCurrency(this.summaryData?.totalExpenses || 0, this.settings.currency)}
          </div>

          <div class="breakdown">
            ${this.summaryData?.expenseCategories?.map(category => html`
              <div class="breakdown-item">
                <div class="breakdown-label">${category.category}</div>
                <div class="breakdown-value">
                  ${formatCurrency(category.amount, this.settings.currency)}
                  ${category.amount > 0 && this.summaryData?.totalExpenses > 0
                    ? html`<span class="percentage">(${Math.round((category.amount / this.summaryData.totalExpenses) * 100)}%)</span>`
                    : ''}
                </div>
              </div>
            `)}
          </div>

          <!-- Expenses pie chart -->
          <div class="chart-container">
            ${this.summaryData?.expenseCategories?.some(cat => cat.amount > 0)
              ? html`<expense-pie-chart
                  .data=${this.summaryData.expenseCategories}
                  currency=${this.settings.currency}
                ></expense-pie-chart>`
              : html`<div class="placeholder-chart">
                  No expense data available
                </div>`
            }
          </div>
        </div>
      ` : ''}
    `;
  }
}

customElements.define('summary-view', SummaryView);
