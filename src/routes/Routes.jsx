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

    const withoutChildren = [];

    const navigation = navItemsParents.map((parent) => {

        const withChildren = [];
        
        const matches = navItems.map((child) => {
            if(child.shown){
                return (`/${child.path}`).indexOf(parent.path) !== -1
                    ? withChildren.push(child)
                    : withoutChildren.push(child);
            }
        });

        return matches.length === 0 ? null : {
            ...parent,
            navigationData: withChildren
        }
    });

    const ret = navigation.concat(withoutChildren);

    return { navigation: ret, securedPages };
}