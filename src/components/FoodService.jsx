/* eslint-disable no-unused-vars */
import * as React from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import { TabContext, TabList } from '@mui/lab';
import useMeal from '../Hooks/useMeal';
import Meal from './Meal';
import Lottie from 'lottie-react';
import loading from '../assets/loading.json'
import { useNavigate } from 'react-router-dom';

const FoodService = () => {
    const [value, setValue] = React.useState('all');
    const navigate = useNavigate();
    const [data, isLoading, isFetched] = useMeal();
    if (!isFetched) {
        return <div>
            <Lottie animationData={loading} loop={true}></Lottie>
        </div>
    }
    console.log(data);
    const break_fast = data.filter(meal => meal.category == "Breakfast")
    const lunch = data.filter(meal => meal.category == "Lunch")
    const dinner = data.filter(meal => meal.category == "Dinner")
    // console.log(data);
    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
    };
    const handleBack = () => {
        navigate('/meals')
    }


    return (
        // <Box sx={{ width: '50%', border: 1 }}>

        <TabContext value={value}>
            <button onClick={handleBack} className=" btn bg-f-title font-Nunito text-lg px-6 py-1 text-f-icon">
                All
            </button>
            {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
            <TabList onChange={handleChange} textColor="secondary"
                indicatorColor="secondary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="secondary tabs example">
                <Tab label="All Meals" value="all" />
                <Tab label="Break-fast" value="breakfast" />
                <Tab label="Lunch" value="lunch" />
                <Tab label="Dinner" value="dinner" />
            </TabList>
            {/* </Box> */}
            <TabPanel value="all">
                <div className=' grid gap-4 grid-cols-1 md:grid-cols-2 place-content-center lg:grid-cols-3'>
                    {
                        data?.map((meal, idx) => (
                            <Meal key={idx} meal={meal} />
                        ))
                    }
                </div>
            </TabPanel>
            <TabPanel value="breakfast">
                <div className=' grid gap-4 grid-cols-1 md:grid-cols-2 place-content-center lg:grid-cols-3'>
                    {
                        break_fast?.map((meal, idx) => (
                            <Meal key={idx} meal={meal} />
                        ))
                    }
                </div>

            </TabPanel>
            <TabPanel value="lunch">
                <div className=' grid gap-4 grid-cols-1 md:grid-cols-2 place-content-center lg:grid-cols-3'>
                    {
                        lunch?.map((meal, idx) => (
                            <Meal key={idx} meal={meal} />
                        ))
                    }
                </div>

            </TabPanel>
            <TabPanel value="dinner">
                <div className=' grid gap-4 grid-cols-1 md:grid-cols-2 place-content-center lg:grid-cols-3'>
                    {
                        dinner?.map((meal, idx) => (
                            <Meal key={idx} meal={meal} />
                        ))
                    }
                </div>

            </TabPanel>
        </TabContext>

    );
}
export default FoodService;