"use client";
import { signOut } from "next-auth/react";
import "@/style/Header.css";

export default function Header({user} : any){
    return(
        <header>
            
          <nav>
           <h2>WarehouseOS</h2>
             <div className="compt">
                <span>
                {user?.name}
                </span>
                 <span>
                {user?.email}
                </span>
             </div>
             

                 <button onClick={()=> signOut ({callbackUrl : "/login"})}>
                    Déconnexion
                 </button>
          </nav>  
        </header>
    );
}