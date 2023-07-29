
import { BsSun } from 'react-icons/bs'
import { BiSolidMoon } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { DataContext } from '../context/DataContxetProvider'

const Navigation = ({ white, setWhite}) => {

    const {account} = useContext(DataContext)

    return (
        <div className={white ? `bg-white font-semibold font-joseph text-black` : `bg-black font-joseph font-semibold text-white`}>
            <div className='flex flex-row justify-between mx-8 md:mx-32 text-xl'>
                <div className='mt-8 flex items-center'>
                    <h1 className='navigation__heading'>AI Mint</h1>
                </div>

                <div className='flex flex-row gap-4 mt-8 items-center'>
                    <Link to='/' className='cursor-pointer'>Home</Link>
                    {account 
                    ? <Link to='/history' className='cursor-pointer'>History</Link>
                    : <p className='cursor-pointer text-zinc-600'>History</p>


                    }
                    {white ? (
                        <BiSolidMoon size={25} className='cursor-pointer' onClick={() => setWhite(false)} />
                    ) : (
                        <BsSun size={25} className='font-bold cursor-pointer ' onClick={() => setWhite(true)} />
                    )}
                </div>
            </div>

        </div>
    );
}

export default Navigation;