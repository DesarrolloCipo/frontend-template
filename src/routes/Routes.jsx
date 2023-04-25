import { LogoDev } from "@mui/icons-material";
import PrivateRoute from "./PrivateRoute";
import { Pages } from "./Pages";

const navItemsParents = [
    {
        name: "Super",
        icon: LogoDev,
        path: "/super",
        navigationData: []
    }
];

export const Routes = (navItems) => {

    const securedPages = Pages.map((page) => {
        const match = navItems.find((item) => page.path.indexOf(item.path) !== -1);
        return match ?
            {
                path: page.path,
                element: (
                    <PrivateRoute roles={match.roles}>
                        {page.element}
                    </PrivateRoute>
                )
            } : null;
    });

    const navigation = navItemsParents.map((parent) => {
        
        const matches = navItems.filter(
            (child) => (`/${child.path}`).indexOf(parent.path) !== -1 && child.shown
        );
        return {
            ...parent,
            navigationData: matches
        }
    });

    return { navigation, securedPages };
}