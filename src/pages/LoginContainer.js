// @flow
import React, {Component} from 'react'
import {AppBar} from "material-ui";
import Link from "react-router/es/Link";
import ludiClasse from "./ludiClasse.jpg";


type Props = {
    children: Array<any>
};

type State = {
};


class LoginContainer extends Component<Props, State> {

    render() {
        return (
            <div>
                <AppBar
                    title={<Link to={"/"} ><span className="appBarTitle">LudiClasse</span></Link>}
                    iconStyleLeft={{display: "none"}}
                />
                <div style={{position: "absolute", left:"0%", right:"0%", top:"0%", bottom:"0%", paddingTop: "7%", paddingRight:"3%", paddingLeft:"3%", paddingBottom:"3%", backgroundColor:"#575757"}}>
                    <div style={{position: "absolute", width: "30%", marginRight:"53%", paddingLeft:"5%", paddingRight:"5%", paddingTop:"2%", paddingBottom:"2%", boxShadow: "4px 4px 15px 1px rgba(0,0,0,0.44)", backgroundColor:"white"}}>
                        <p>Bienvenue!<br/><br/>
                            L'équipe de LudiClasse est heureux de vous voir parmi nous.<br/>
                            Nous vous souhaitons une bonne expérience sur notre application et vous souhaitons une bonne journée.<br/>
                            Pour utiliser nos fonctionnalités veuillez vous connecter.<br/>
                            Si vous n'avez pas d'identifiants, veuillez vous inscrire.<br/>
                            <br/><br/>
                            <img src={ludiClasse} alt={""} width="100%"/>
                            <br/>
                        </p>
                    </div>
                    <div style={{position: "absolute", width: "30%", marginLeft: "53%", paddingLeft:"5%", paddingRight:"5%", paddingTop:"2%", paddingBottom:"2%", boxShadow: "4px 4px 15px 1px rgba(0,0,0,0.44)", backgroundColor:"white"}}>

                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginContainer;
