import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
const Banner = () => {
    return (
        <div className='relative flex justify-center items-center border h-full'>
            <div className='info font-play-serif w-1/2 md:w-1/2 lg:w-1/2 relative z-10'>
                <h1 className='text-3xl md:text-5xl lg:text-7xl font-play-serif font-bold text-justify pb-3 text-white'>Simplifying <span className=" ">Hostel Life</span>, with Home like Foods</h1>
                <p className='text-xs lg:text-sm md:w-[500px] lg:w-[500px] p-2 text-white'>Discover a new level of convenience with HostelHub Meals. We take care of your hostel dining needs, offering chef-prepared meals delivered to your doorstep. Enjoy a variety of delicious options, flexible plans, and the ease of hostel life without compromising on taste</p>
                <div className='lg:flex hidden'>
                    <Button variant="contained" style={{ backgroundColor: ' #AF491Cff', color: '#FFE7D5ff' }}>See More</Button>
                    <TextField id="outlined-search" style={{ backgroundColor: ' #FFE7D5ff' }} label="Search field" type="search" />
                </div>
            </div>
        </div>


    );
};

export default Banner;