
import '../index.css'

const Public = () => {
    const content = (
        <div className='color-white'>
            <header className="header-public">
                <div className='logo-box1'>
                    <img src="./img/logo.png" alt="AUST" className="logo1"></img>
                </div>

                <div className='text-box'>
                    <h1 className="heading-primary">
                    <span className="heading-primary-main">Abbottabad</span>
                    <span className="heading-primary-sub">University of Science & Technology</span>
                </h1>
                <div className='btn-display'>
                <a href='/studentlogin' className='btn btn-white btn-animated'>Student Login</a>
                <a href='/login' className='btn btn-white btn-animated'>Admin Login</a>
                </div>
                </div>
                


            </header>
            
            <footer>
                
            </footer>
        </div>

    )
    return content
}
export default Public