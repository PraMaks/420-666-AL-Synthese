import Home from '../components/Home';

import auth from '../services/Auth';

export const ROUTES = [
    {
        link : "/home/:username",
        component: Home,
        accessValid: () => auth.isStudent() || auth.isInternshipManager() || auth.isSupervisor() || auth.isMonitor()
    },
    
]