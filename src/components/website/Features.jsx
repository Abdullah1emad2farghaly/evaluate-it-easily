// src/components/Features.jsx
import { motion } from "framer-motion";
import { fadeUp } from "../../animations";
import { ScanSearch, Users, ClipboardCheck, TrendingUp } from "lucide-react";

const features = [
    {
        icon: ScanSearch,
        title: "AI Similarity Detection",
        desc: "Detect duplicate proposals using NLP.",
    },
    {
        icon: Users,
        title: "Supervisor Matching",
        desc: "Smart assignment based on expertise.",
    },
    {
        icon: ClipboardCheck,
        title: "Evaluation System",
        desc: "Streamlined committee workflow.",
    },
    {
        icon: TrendingUp,
        title: "Progress Tracking",
        desc: "Monitor project lifecycle.",
    },
];

export default function Features() {
    return (
        <section className="py-28">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">
                {features.map((f, i) => {
                    const Icon = f.icon;
                    return (
                        <motion.div
                            key={i}
                            variants={fadeUp(i * 0.1)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="card flex gap-4"
                        >
                            <Icon className="text-primary-600" />
                            <div>
                                <h3 className="font-semibold">{f.title}</h3>
                                <p className="text-sm text-gray-500">{f.desc}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}