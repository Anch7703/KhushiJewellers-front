import React from "react";
import { motion } from "framer-motion";
import { Award, Heart, Gem, Users } from "lucide-react";
import styles from "./about.module.css";

export default function About() {
    const values = [
        {
            icon: Gem,
            title: "Premium Quality",
            description: "Every piece in our collection meets the highest standards of craftsmanship and materials."
        },
        {
            icon: Heart,
            title: "Passion for Beauty",
            description: "We believe jewelry should celebrate life's precious moments with elegance and style."
        },
        {
            icon: Award,
            title: "Expert Curation",
            description: "Our team carefully selects each piece for its exceptional design and lasting value."
        },
        {
            icon: Users,
            title: "Customer First",
            description: "Building lasting relationships through trust, service, and beautiful jewelry experiences."
        }
    ];

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBg}></div>
                <div className={styles.heroContent}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className={styles.heroTitle}>Our Story</h1>
                        <p className={styles.heroText}>
                            For almost two decades, Khushi Jewellers has been crafting moments of beauty and elegance. 
                            Our passion for exceptional jewelry drives everything we do.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className={styles.story}>
                <div className={styles.storyInner}>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className={styles.storyHeader}>
                            <h2>Crafting Beauty Since 2007</h2>
                            <div className={styles.storyDivider}></div>
                        </div>

                        <div className={styles.storyGrid}>
                            <div className={styles.storyText}>
                                <p>Every sparkle has a story — and ours began on two wheels..</p>
                                <p>What started as a humble journey on a bicycle, carrying boxes of handmade jewelry through winding streets, 
                                    soon became a dream too bright to be contained..</p>
                            </div>
                            <div className={styles.storyImageWrapper}>
                                <img src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=400&fit=crop&crop=center" alt="Jewelry crafting process" className={styles.storyImage}/>
                            </div>
                        </div>

                        <div className={styles.storyGridReverse}>
                            <div className={styles.storyImageWrapper}>
                                <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop&crop=center" alt="Luxury jewelry display" className={styles.storyImage}/>
                            </div>
                            <div className={styles.storyText}>
                                <p>Today, our store stands as a reminder that success isn’t born overnight — it’s built, piece by piece, with heart and hard work..</p>
                                <p>Welcome to our world — where every ornament holds a memory, and every design shines with a story worth wearing. ✨</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className={styles.values}>
                <div className={styles.valuesInner}>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={styles.valuesHeader}>
                        <h2>Our Values</h2>
                        <p>These principles guide everything we do...</p>
                    </motion.div>

                    <div className={styles.valuesGrid}>
                        {values.map((value, index) => (
                            <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={styles.valueCard}>
                                <div className={styles.valueIconWrapper}>
                                    <value.icon className={styles.valueIcon} />
                                </div>
                                <h3 className={styles.valueTitle}>{value.title}</h3>
                                <p className={styles.valueDesc}>{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className={styles.trust}>
                <div className={styles.trustInner}>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2>Built on Trust</h2>
                        <p>For over two decades, thousands of customers have trusted us...</p>
                        <p>Our commitment to quality, authenticity, and exceptional service...</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
