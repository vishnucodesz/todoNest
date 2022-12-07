
import './index.css'

function Protected({Component}) {
    const isAuth = localStorage.getItem('loginStatus')
    if(isAuth){
        return (
            // <div className='main-container'>
            //     <h1>Hello</h1>
            // </div>
            Component
        )
    }
    else{
        return <div className='main-background'>Please Login !!!</div>
    }
}
export default Protected;