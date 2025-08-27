import { useTheme } from '../hooks/ThemeContext';

export default function Settings({ open, onClose, onSubmit }) {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <div className={`fixed inset-0 z-50 flex justify-center items-center transition-colors duration-200 ${open ? "visible bg-black/50" : "invisible"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`relative bg-white rounded-xl shadow p-6 w-2xl h-11/12 transition-all duration-200 dark:bg-slate-950 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button onClick={onClose} className="absolute top-2 right-4 p-1 rounded-lg text-gray-400 hover:text-black cursor-pointer dark:text-gray-400 dark:hover:text-white">✕</button>

                {/* Header */}
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 dark:text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <h2 className="text-lg font-semibold dark:text-white">Settings</h2>
                </div>

                {/* Appearance */}
                <div className="mt-4 border rounded-md border-gray-500/30 p-4 h-auto overflow-auto">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 dark:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
                        </svg>
                        <h2 className="font-semibold text-2xl dark:text-white"> Appearance</h2>
                    </div>

                    <div className="mt-6 flex justify-between items-center px-2">
                        <div>
                            <p className="text-sm font-medium dark:text-white">Dark Mode</p>
                            <p className="text-sm font-light text-gray-500">Switch between light and dark themes</p>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 dark:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>

                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={darkMode}
                                    onChange={toggleTheme}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full transition-all duration-300 dark:bg-white">
                                    <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 dark:translate-x-5 dark:bg-black"></span>
                                </div>
                            </label>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 dark:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        </div>

                    </div>
                </div>

                {/* Change Password */}
                <div className="mt-4 border rounded-md border-gray-500/30 p-4 h-auto overflow-auto">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 dark:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                        </svg>
                        <h2 className="font-semibold text-2xl dark:text-white">Change Password</h2>
                    </div>

                    <div class="mt-4 grid grid-cols-1 gap-4 px-3">
                        <div className="flex flex-col justify-center gap-1">
                            <p className="text-sm font-medium dark:text-white">Current Password</p>
                            <input type="text" placeholder="Enter current password" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full dark:text-gray-300" />
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                            <p className="text-sm font-medium dark:text-white">New Password</p>
                            <input type="text" placeholder="Enter new password" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full dark:text-gray-300" />
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                            <p className="text-sm font-medium dark:text-white">Confirm New Password</p>
                            <input type="text" placeholder="Confirm new password" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full dark:text-gray-300" />
                        </div>
                        <button className="text-sm bg-black py-2 text-white rounded-sm hover:bg-zinc-800 cursor-pointer dark:bg-white dark:text-black dark:hover:bg-gray-300">Update Password</button>
                    </div>
                </div>

            </div>
        </div>
    );
}