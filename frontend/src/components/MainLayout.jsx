import Sidebar from './Sidebar';
import TopBar from './Topbar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import AddClaim from '../pages/AddClaim.jsx';
import Settings from '../pages/Settings.jsx';

export default function MainLayout() {
    const [open, setOpen] = useState(false);
    const [settings, setSettings] = useState(false);

    return (
        <div className="flex h-screen dark:bg-slate-950">
            
            <div className="sticky top-0 h-screen shrink-0">
                <Sidebar setOpenAddClaim={setOpen} />
            </div>

            
            <div className="flex flex-col flex-1 overflow-hidden">
                
                <div className="sticky top-0 z-10">
                    <TopBar setOpenSettings={setSettings} />
                </div>

                
                <div className="flex-1 overflow-y-auto p-4">
                    <Outlet />
                </div>
            </div>

            <AddClaim open={open} onClose={() => setOpen(false)} onSubmit={() => setOpen(false)} />
            <Settings open={settings} onClose={() => setSettings(false)} onSubmit={() => setSettings(false)} />
        </div>
    );
}
