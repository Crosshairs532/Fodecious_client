/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { color, fontFamily } from '@mui/system';
import Swal from 'sweetalert2'
import axios from 'axios';
import { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProdiver';
import useAxiosPublic from '../Axios/useaxiosPublic';
import { FcGoogle } from "react-icons/fc";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link to='/'> Fodecious</Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const defaultTheme = createTheme();
const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, GoogleSignIn } = useContext(authContext);
    const goTo = useNavigate();
    const axiosPublic = useAxiosPublic();
    const onSubmit = async (data) => {


        const userInfo = { email: data?.email }
        // signIn(data?.email, data?.password)
        try {
            Swal.fire({
                title: 'Logging in...',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                },
            });
            const res = await signIn(data?.email, data?.password);
            console.log("after");
            Swal.close();
            Swal.fire({
                icon: 'success',
                title: 'Login successful',
                text: `${res?.user?.displayName}`,
            });

            navigate(location.state ? location.state : '/')

        } catch (error) {
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Login failed. Please check your credentials.',
            });
        }

    };



    const handleGoogleSignIn = () => {
        GoogleSignIn()
            .then(res => {
                console.log(res);
                const userInfo = {
                    email: res.user?.email, name: res.user?.displayName, image: res.user?.photoURL, role: 'user', badge: 'bronze',
                    all_badge: ['bronze']
                }
                axiosPublic.post('/user', userInfo)
                    .then(res => {
                        console.log(res.data);
                        Swal.fire({
                            icon: 'success',
                            title: 'Login successful',

                        });
                        navigate('/')

                    })
            })
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        fontFamily: 'play-serif',
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" style={{ fontFamily: 'play-serif' }} variant="h2">
                        Sign In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>

                        <TextField
                            {...register('email', { required: true })}
                            margin="normal"
                            fullWidth
                            name="email"
                            label="Email"
                            type="email"
                            id="email"
                            autoComplete="current-email"
                            placeholder="Your Email.." />
                        {/* {errors.email && <span className="text-red-600">Email is required</span>} */}
                        {errors.email && <span style={{ color: ' red' }}>Name is required</span>}
                        <TextField
                            {...register('password', { required: true })}
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {errors.password && <span style={{ color: ' red' }} > password is required</span>}

                        <div>
                            <button onClick={handleGoogleSignIn} className=' btn bg-white shadow-xl'>
                                <FcGoogle size={40} />
                            </button>
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <h1>Don't Have an Account ?  <Link to='/registration' className=' font-play-serif font-bold'>Sign Up</Link></h1>
                            </Grid>
                        </Grid>
                    </Box>

                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider >
    );
};
export default Login;