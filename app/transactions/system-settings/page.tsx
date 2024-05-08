import React from 'react'
import SystemSettingsPage from '@/app/components/SystemSettingsPage/SystemSettingsPage';
import ReactQueryProvider from '@/app/components/ReactQueryProvider/ReactQueryProvider';
import { metadata } from '@/app/layout';

function SystemSettings() {
  metadata.description = "Set systems data";
  metadata.title = "System settings";
  return (
    <ReactQueryProvider>
      <SystemSettingsPage />
    </ReactQueryProvider>
  )
}

export default SystemSettings;