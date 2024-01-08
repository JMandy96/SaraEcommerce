"use Client";

import { ShoppingBag } from "lucide-react";
import Button from "./ui/button";
import { useEffect, useState } from "react";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (isMounted) {
        return null;
    }

    return (
        <div className="ml-auto flex items-center gap-x-4">
            <Button className="flex items-center rounded-full bg-black px-4 py-2" style={{ flexDirection: 'row' }}>
                <ShoppingBag 
                    size={20}
                    color="#b3ea11"
                />
                <span className="ml-2 text-sm font-medium" style={{ color: "#b3ea11" }}>
                    0
                </span>
            </Button>
        </div>
    );
}

export default NavbarActions;