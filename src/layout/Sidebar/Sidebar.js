import React, { useEffect, useRef, useState } from "react";
import styles from "./css/sidebar.module.css";

const Sidebar = ({ width=280, children }) => {
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(width);
    const [scrollPosition, setScrollPosition] = useState(0);
    const side = useRef();

    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    };

    useEffect(() => {
        window.addEventListener("scroll", updateScroll);
    }, []);

    // button toggle action
    const toggleMenu = () => {
        if (xPosition > 0) {
            setX(0);
            setOpen(true);
        } else {
            setX(width);
            setOpen(false);
        }
    };

    // close action
    const handleClose = async e => {
        let sideArea = side.current;
        let sideChildren = side.current.contains(e.target);
        if (isOpen && (!sideArea || !sideChildren)) {
            await setX(width);
            await setOpen(false);
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleClose);
        return () => {
            window.removeEventListener('click', handleClose);
        };
    })

    return (
        <div className={styles.container}>
            <div ref={side}  className={styles.sidebar} style={{ width: `${width}px`, height: '100%',  transform: `translatex(${-xPosition}px)`}}>
                <button onClick={() => toggleMenu()}
                        className={styles.button} style={{ top: scrollPosition > 100 ? 10 : 60 }} >
                    {isOpen ?
                        <span>X</span> : <span></span>
                        // <img src="/src/Images/listBullet.png" alt="contact open button" className={styles.openBtn}/>
                    }
                </button>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
};

export default Sidebar;