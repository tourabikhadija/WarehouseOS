import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";
import "@/style/dashboard.css";


export default async function Dashboard() {

  const session = await getServerSession(authOptions);


  if (!session) {
    redirect("/login");
  }


  const loginDate = new Date().toLocaleString("fr-FR");


  
 return (
  <div className="dashboard">

    <Header user={session.user} />


    {session.user ? (
      <div className="dashboard-content">

        

        <div className="user-card">
        
         <h2>
          Bienvenue
        </h2>
          
          <div>

           <h3>
            Informations utilisateur
          </h3>
          
          </div>
          

          <p>
            Nom : {session.user.name}
          </p>

          <p>
            Email : {session.user.email}
          </p>

          
            <p>Date de connexion :{loginDate}  
            </p>
            
          

        </div>

      </div>
    ) : (
      <p className="no-user">
        Aucun utilisateur connecté
      </p>
    )}

    <Footer />

  </div>
);
}