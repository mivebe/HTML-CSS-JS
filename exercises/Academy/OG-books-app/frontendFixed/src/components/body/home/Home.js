import React from 'react'
import './Home.css'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {

    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&w=1000&q=80"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Your reading list</h3>
                    <p>When it comes to books, most people feel a strange mixture of greed and apathy.
                    We like to buy the books, store them up on the shelves, but do not always read them.
                          A huge number of unread books discourages us. And here comes our webpage.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://cdn.pixabay.com/photo/2019/02/16/09/04/book-3999893_960_720.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Read at least 30 pages a day</h3>
                    <p>All people have their own read rate. Some people prefer reading a book per month or more, sticking to details page by page.
                    Some people run through the whole book in a couple of days. However, there is a simple and universal formula of reading.
                    It helps to read and finish the book to the end before you lose your interest and curiosity.
Try to read at least for one hour a day and at least 30 pages per day. Therefore, you will be able read one book week. It is 60 books a year, what an excellent result!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://bookhugpress.ca/wp-content/uploads/2018/05/Roundtable2_Image1-1.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Write about the information you read</h3>
                    <p>Everyone has several favorite genres of literature. However,
                    if we delve into detective novels or business books too much,
                          we can get sick of it . Even exciting books may become annoying.</p>
                </Carousel.Caption >
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src='https://i.pinimg.com/originals/d8/33/d7/d833d7220aad414fdede40e77366b962.jpg'
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Re-read your notes</h3>
                    <p>Make it a habit to re-read your book notes. It often happens that you read something interesting and try to remember it,
                    but in several days you may completely forget the information that was so important to you. Making notes helps you to learn information by heart easier and faster.
                    Notes are always at hand.
                         Practice makes perfect. So the key ideas will always be at hand whenever you need it.</p>
                </Carousel.Caption >
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://wallpapercrafter.com/desktop/211798-book-read-californium-and-socal-hd.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Who is the author? What does he write?</h3>
                    <p>Before reading, take stock of the book: read about the author of the book, briefly review the main topic.
                    Thus, you will be able to get yourself ready for the reading. In addition, before reading ask yourself what would you like to know about the book?
                    What problems will it help to resolve?
                         This will help to cling to the subject matter of the book that is useful for you.</p>
                </Carousel.Caption >
            </Carousel.Item>
        </Carousel>
    )
}

export default Home
