import React from 'react';
import { OccasionProvider, useOccasion } from './context/OccasionContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { CalendarView } from './components/calendar/CalendarView';
import { NotificationsView } from './components/notifications/NotificationsView';
import { ConnectorsView } from './components/connectors/ConnectorsView';
import { OccasionOverlay } from './components/overlay/OccasionOverlay';
import './styles/index.css';
import './styles/app.css';

const MainLayout: React.FC = () => {
  const { activeView } = useOccasion();

  const renderActiveView = () => {
    switch (activeView) {
      case 'calendar':
        return <CalendarView />;
      case 'connectors':
        return <ConnectorsView />;
      case 'notifications':
        return <NotificationsView />;
      default:
        return <CalendarView />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="app-main">
        <TopBar />
        {renderActiveView()}
      </div>
      <OccasionOverlay />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <OccasionProvider>
      <MainLayout />
    </OccasionProvider>
  );
};

export default App;
