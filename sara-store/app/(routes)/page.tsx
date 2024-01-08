import getBillboard from "@/actions/get-billboard";
import BillBoard from "@/components/billboard";
import Container from "@/components/ui/container";

export const revalidate =0;

const HomePage = async () => {
    const billboard = await getBillboard('a5bd406f-c2ec-4160-a112-5d99a49e7f2d');
    return ( 
        <div 
            style={{ 
                fontSize: '30px', 
                color: '#b3ea11',
                textShadow: '1px 1px 45px #b3ea11, 1px 1px 50px yellow, 1px 1px 100px black;'  // Example text shadow
            }} 
        > 
        <Container>
            <div className= "space-y-10 pb-10">
                <BillBoard data={billboard} />
            </div>
        </Container>
        </div>
     );
}
 
export default HomePage;