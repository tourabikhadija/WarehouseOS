import Link from "next/link";
import "@/style/Home.css";
import Image from "next/image";

export default function Home(){
    return (
        <main className="home">
            <h1>WarehouseOS</h1>
              <div className="background">
                 <Image src="/images/bg.jpg" alt="img-cover" fill priority 
                   />
                   <div className="overlay"></div>
              </div>


             <div className="btn">
            <Link href="/login" className="login">
            <button>Login</button>
            </Link>
            
            <Link href="/register" className="register">
            <button>Register</button>
            </Link>
             </div>
            
        </main>
    );
}