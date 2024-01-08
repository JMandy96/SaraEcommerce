"use client";
import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";

export const revalidate = 0;

const Navbar = async () => {
    const categories = await getCategories();

    return ( 
        <div className="border-b bg-black">
            <Container>
            <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center"          
                style={{ 
                fontSize: '30px', 
                color: '#b3ea11',
            }} >
                <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2" >
                    <p className="font-bold text-xl" style={{textShadow: '1px 1px 5px #b3ea11, 1px 1px 10px hotpink, 1px 1px 15px hotpink, 1px 1px 20px hotpink, 1px 1px 25px hotpink'}}>RadiumLady Vintage</p>
                </Link>
                <MainNav data={categories} />
                <NavbarActions />
            </div>
            </Container>
        </div>
    );
};
 
export default Navbar;