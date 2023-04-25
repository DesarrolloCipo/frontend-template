import { List } from '@mui/material';
import NavigationItem from './NavigationItem';
import { isUndefined } from 'lodash';

const Navigation = ({ data, collapsed }) => {
    
    if(!Array.isArray(data)) return null;

    let renderData = data?.map((item, index) => {
        if(!isUndefined(item.navigationData)){
            if(!item.navigationData.some((nav) => 
                nav.roles.includes(sessionStorage.getItem("id_rol"))
            )) return null;
        }
        return <NavigationItem key={index} item={item} collapsed={collapsed} />
    });

    if(renderData.length === 0) return null;

    return(
        <List sx={{listStyle: "none"}} component="nav">
            {renderData}
        </List>
    );
};

export default Navigation;