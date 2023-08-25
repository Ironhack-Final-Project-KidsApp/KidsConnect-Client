import GitHubLogo from '../assets/github.png';

function Footer() {
    return(
        <div>
            <p>Made by:</p>
            <a href='https://github.com/InesAlmeida-91'>Inês Almeida <img src={GitHubLogo} alt="GitHubLogo" style={{width: '2rem'}}></img></a>
            <br/>
            <a href='https://github.com/SchenRinan'>Jan Schnell <img src={GitHubLogo} alt="GitHubLogo" style={{width: '2rem'}}></img></a>
        </div>
    )
}

export default Footer;