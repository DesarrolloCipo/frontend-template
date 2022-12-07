import { List } from '@mui/material';
import NavigationItem from './NavigationItem';

const Navigation = ({ data, collapsed }) => {
    
    if(!Array.isArray(data)) return null;

    let renderData = data?.map((item, index) => {
        return <NavigationItem key={index} item={item} collapsed={collapsed} />
    });

    return(
        <List sx={{listStyle: "none"}} component="nav">
            {renderData}
        </List>
    );
};

export default Navigation;