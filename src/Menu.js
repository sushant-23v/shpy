import React from 'react';

const Menu = () => {
    const menuItems = [
        { name: 'Espresso', description: 'Rich and bold coffee shot.' },
        { name: 'Latte', description: 'Smooth coffee with creamy milk.' },
        { name: 'Cappuccino', description: 'Espresso with frothed milk and cocoa.' },
        { name: 'Croissant', description: 'Flaky pastry perfect with coffee.' },
    ];

    return (
        <section id="menu">
            <h2>Menu</h2>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Menu;
