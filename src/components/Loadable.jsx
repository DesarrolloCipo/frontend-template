import { Suspense } from "react";
import { Spinner } from ".";

const Loadable = (Component) => (props) =>(
    <Suspense fallback={<Spinner />}>
        <Component {...props} />
    </Suspense>
);

export default Loadable;