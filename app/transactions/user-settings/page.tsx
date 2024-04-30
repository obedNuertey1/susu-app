import React from 'react';
import UserSettingsPage from '@/app/components/UserSettingsPage/UserSettingsPage';
import ReactQueryProvider from '@/app/components/ReactQueryProvider/ReactQueryProvider';
import { metadata } from '@/app/layout';

function UserSettings() {
  metadata.description = "A page that displays and allows you to set your personal data";
  metadata.title = "User Settings";
  return (
    <ReactQueryProvider>
      <UserSettingsPage />
    </ReactQueryProvider>
  )
}

export default UserSettings;