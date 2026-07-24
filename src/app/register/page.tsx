import RegisterForm  from "@/components/RegisterForm";
import Image from "next/image";
import "@/style/Register.css";

export default function Register(){
    return(
      <main className="register">
                  <h1>WarehouseOS</h1>
                    <Image src="/images/bg.jpg" alt="img-cover" fill priority style={{
                       zIndex: -1,}} 
                     />
           <RegisterForm/>
        </main>
    );
}