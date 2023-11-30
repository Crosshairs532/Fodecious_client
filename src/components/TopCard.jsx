/* eslint-disable no-unused-vars */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import breakfast from '../assets/breakfast-1.jpeg'
import dinner from '../assets/Dinner.jpeg'
import lunch from '../assets/lunch.jpeg'
import { MdOutlineFastfood } from 'react-icons/md';
import { Rating } from '@mui/material';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const TopCard = () => {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return <>
        <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        <MdOutlineFastfood />
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={<Typography variant="h6" style={{ fontFamily: 'play-serif', color: '#6C4C4Cff' }}>
                    Caramel with milk
                </Typography>
                }
                subheader="Break-Fast"
            />
            <CardMedia
                component="img"
                height="194"
                image={breakfast}
                alt="Caramel with milk"
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: '#3C0D0Dff', fontFamily: 'play-serif' }} >
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <Rating name="half-rating" defaultValue={2.5} precision={.5} />

            </CardActions>

        </Card>
        <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        <MdOutlineFastfood />
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <Typography variant="h6" style={{ fontFamily: 'play-serif', color: '#6C4C4Cff' }}>
                        Hilsha Fish with Rice
                    </Typography>
                }
                subheader="Lunch"
            />
            <CardMedia
                component="img"
                height="194"
                image={lunch}
                alt="Chicken Curry with rice"
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: '#3C0D0Dff', fontFamily: 'play-serif' }}>
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />

            </CardActions>

        </Card>
        <Card sx={{ maxWidth: 345, boxShadow: 3 }} >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        <MdOutlineFastfood />
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <Typography variant="h6" style={{ fontFamily: 'play-serif', color: '#6C4C4Cff' }} >
                        Chicken Curry with rice
                    </Typography>
                }
                subheader="Dinner"
            />
            <CardMedia
                component="img"
                height="194"
                image={dinner}
                alt="Beef with rice"
            />
            <CardContent >
                <Typography variant="body2" sx={{ color: '#3C0D0Dff', fontFamily: 'play-serif' }}>
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />

            </CardActions>

        </Card >

    </>
}




export default TopCard;