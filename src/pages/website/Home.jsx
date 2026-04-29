import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import HubIcon from "@mui/icons-material/Hub";
import { keyframes } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const gradientShift = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const floatA = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(24px, -16px) scale(1.05); }
`;

const floatB = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-20px, 20px); }
`;

const steps = [
    {
        n: "01",
        title: "Create your workspace",
        text: "Set up teams, invitations, and project metadata in guided steps.",
    },
    {
        n: "02",
        title: "Submit proposals",
        text: "Upload documents, abstracts, and track review status live.",
    },
    {
        n: "03",
        title: "Evaluate with AI assists",
        text: "Run similarity checks and committee workflows in one timeline.",
    },
    {
        n: "04",
        title: "Ship decisions",
        text: "Export outcomes, notifications, and historical archives instantly.",
    },
];

const testimonials = [
    {
        initials: "A.R.",
        quote:
            "The dashboard cut our coordination time dramatically. Committees finally see everything in sync.",
        name: "Dr. Ahmed Riad",
        role: "Chair, CS Department",
    },
    {
        initials: "S.M.",
        quote:
            "Submission flow is crystal clear—students stopped missing deadlines after we switched.",
        name: "Sara Mohamed",
        role: "Graduate Supervisor",
    },
    {
        initials: "Y.K.",
        quote:
            "Analytics surfaced bottlenecks we never saw in spreadsheets.",
        name: "Youssef Khalil",
        role: "Program Admin",
    },
];

const features = [
    {
        icon: <SpeedIcon sx={{ fontSize: 36 }} />,
        title: "End-to-end speed",
        description:
            "From draft proposal to faculty sign-off runs on streamlined workflows tuned for academia.",
    },
    {
        icon: <SecurityIcon sx={{ fontSize: 36 }} />,
        title: "Controlled access",
        description:
            "Role-based dashboards keep student data partitioned while admins retain full oversight.",
    },
    {
        icon: <HubIcon sx={{ fontSize: 36 }} />,
        title: "Unified collaboration",
        description:
            "Groups, supervisors, and committees share one timeline with actionable notifications.",
    },
];

export default function Home() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "var(--background-color)",
                color: "var(--text-color)",
                overflowX: "hidden",
            }}
        >
            <Box
                component="nav"
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? "backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
                        : ""
                }`}
                sx={{
                    backgroundColor: scrolled ? "rgba(25, 37, 65, 0.72)" : "transparent",
                    borderBottom:
                        scrolled ? "1px solid rgba(0, 188, 138, 0.12)" : "none",
                }}
            >
                <Container maxWidth="lg" className="flex flex-wrap items-center justify-between gap-4 py-4">
                    <Link to="/" className="flex items-center gap-2 no-underline text-inherit">
                        <SchoolIcon sx={{ fontSize: 36, color: "var(--primary-color)" }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
                            Evaluate It Easily
                        </Typography>
                    </Link>
                    <Box className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-medium hover:opacity-80 transition-opacity no-underline" style={{ color: "var(--text-color)" }}>
                            Features
                        </a>
                        <a href="#how" className="text-sm font-medium hover:opacity-80 transition-opacity no-underline" style={{ color: "var(--text-color)" }}>
                            How it works
                        </a>
                        <a href="#testimonials" className="text-sm font-medium hover:opacity-80 transition-opacity no-underline" style={{ color: "var(--text-color)" }}>
                            Testimonials
                        </a>
                        <Button
                            component={Link}
                            to="/auth"
                            variant="contained"
                            sx={{
                                bgcolor: "var(--primary-color)",
                                fontWeight: 700,
                                textTransform: "none",
                                boxShadow: "none",
                                "&:hover": { bgcolor: "var(--primary-color)", opacity: 0.92 },
                            }}
                        >
                            Get started
                        </Button>
                    </Box>
                </Container>
            </Box>

            <Box
                id="hero"
                className="relative flex min-h-screen flex-col justify-center px-4 pt-24 pb-16"
            >
                <Box
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                    aria-hidden
                >
                    <Box
                        sx={{
                            position: "absolute",
                            width: 420,
                            height: 420,
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, color-mix(in srgb, var(--secondary-color) 85%, transparent) 0%, transparent 70%)",
                            filter: "blur(4px)",
                            top: "8%",
                            right: "4%",
                            animation: `${floatA} 18s ease-in-out infinite`,
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            width: 360,
                            height: 360,
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, color-mix(in srgb, var(--secondary-color) 70%, transparent) 0%, transparent 70%)",
                            filter: "blur(2px)",
                            bottom: "12%",
                            left: "2%",
                            animation: `${floatB} 22s ease-in-out infinite`,
                        }}
                    />
                </Box>

                <Container maxWidth="lg" className="relative z-1 text-center">
                    <Typography
                        variant="h2"
                        component="h1"
                        className="font-bold leading-tight tracking-tight md:text-6xl text-4xl sm:text-5xl"
                        sx={{
                            background:
                                "linear-gradient(90deg, var(--text-color) 0%, var(--primary-color) 45%, var(--text-color) 100%)",
                            backgroundSize: "200% auto",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            animation: `${gradientShift} 8s ease infinite`,
                        }}
                    >
                        Intelligence for modern project evaluation
                    </Typography>
                    <Typography
                        className="mx-auto mt-6 max-w-2xl text-base md:text-lg"
                        data-aos="fade-up"
                        sx={{ color: "color-mix(in srgb, var(--text-color) 88%, transparent)" }}
                    >
                        One platform for proposals, AI-assisted reviews, and committee decisions—built for universities that need clarity, not chaos.
                    </Typography>
                    <Box
                        className="mt-10 flex flex-wrap items-center justify-center gap-4"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <Button
                            component={Link}
                            to="/auth"
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: "var(--primary-color)",
                                color: "#0a1629",
                                fontWeight: 700,
                                px: 4,
                                py: 1.5,
                                textTransform: "none",
                                borderRadius: 2,
                                "&:hover": { bgcolor: "var(--primary-color)", opacity: 0.93 },
                            }}
                        >
                            Start free
                        </Button>
                        <Button
                            component={Link}
                            to="/about"
                            variant="outlined"
                            size="large"
                            sx={{
                                borderColor: "var(--primary-color)",
                                color: "var(--primary-color)",
                                fontWeight: 600,
                                px: 4,
                                py: 1.5,
                                textTransform: "none",
                                borderRadius: 2,
                                "&:hover": {
                                    borderColor: "var(--primary-color)",
                                    bgcolor: "rgba(0, 188, 138, 0.08)",
                                },
                            }}
                        >
                            About the platform
                        </Button>
                    </Box>

                    <Grid container spacing={3} className="mt-16" data-aos="fade-up" data-aos-delay="200">
                        {[
                            { label: "500+", sub: "Active users" },
                            { label: "50+", sub: "Programs shipped" },
                            { label: "99%", sub: "Satisfaction" },
                        ].map((s) => (
                            <Grid item xs={12} sm={4} key={s.sub}>
                                <Box
                                    sx={{
                                        borderRadius: 2,
                                        border: "1px solid rgba(0, 188, 138, 0.2)",
                                        py: 2.5,
                                        backgroundColor: "rgba(41, 59, 85, 0.35)",
                                    }}
                                >
                                    <Typography variant="h4" sx={{ fontWeight: 800, color: "var(--primary-color)" }}>
                                        {s.label}
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.85 }}>
                                        {s.sub}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            <Box
                id="features"
                sx={{
                    py: { xs: 8, md: 12 },
                    backgroundColor: "color-mix(in srgb, var(--background-color) 78%, #ffffff 8%)",
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        component="h2"
                        className="text-center font-bold mb-2"
                        data-aos="fade-up"
                        sx={{ color: "var(--text-color)" }}
                    >
                        Built for academic operations
                    </Typography>
                    <Typography
                        className="text-center mb-10 max-w-xl mx-auto"
                        data-aos="fade-up"
                        data-aos-delay="80"
                        sx={{ color: "color-mix(in srgb, var(--text-color) 75%, transparent)" }}
                    >
                        Everything your faculty needs to intake, review, and archive graduate work without losing context.
                    </Typography>
                    <Grid container spacing={4}>
                        {features.map((f) => (
                            <Grid item xs={12} md={4} key={f.title}>
                                <Card
                                    data-aos="fade-up"
                                    elevation={0}
                                    sx={{
                                        height: "100%",
                                        bgcolor: "rgba(30, 45, 61, 0.65)",
                                        border: "1px solid rgba(0, 188, 138, 0.12)",
                                        borderRadius: 3,
                                        transition:
                                            "transform 0.35s ease, box-shadow 0.35s ease",
                                        "&:hover": {
                                            transform: "translateY(-10px)",
                                            boxShadow:
                                                "0 20px 48px rgba(0, 188, 138, 0.18)",
                                        },
                                    }}
                                >
                                    <CardContent className="p-8">
                                        <Box
                                            className="mb-4 inline-flex rounded-full p-3"
                                            sx={{
                                                bgcolor: "rgba(0, 188, 138, 0.12)",
                                                color: "var(--primary-color)",
                                            }}
                                        >
                                            {f.icon}
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                                            {f.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: "color-mix(in srgb, var(--text-color) 80%, transparent)", lineHeight: 1.7 }}
                                        >
                                            {f.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            <Box id="how" sx={{ py: { xs: 8, md: 12 }, bgcolor: "var(--background-color)" }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        component="h2"
                        className="text-center font-bold mb-8"
                        data-aos="fade-up"
                    >
                        How it works
                    </Typography>
                    <Box
                        className="home-how-swiper relative px-2 md:px-10"
                        sx={{
                            "& .swiper-button-next, & .swiper-button-prev": {
                                color: "var(--primary-color)",
                            },
                            "& .swiper-pagination-bullet-active": {
                                background: "var(--primary-color)",
                            },
                            "& .swiper-pagination-bullet": {
                                background: "color-mix(in srgb, var(--text-color) 40%, transparent)",
                            },
                        }}
                    >
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={24}
                            slidesPerView={1}
                            breakpoints={{
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            navigation
                            pagination={{ clickable: true }}
                            loop
                            autoplay={{ delay: 4800, disableOnInteraction: false }}
                        >
                            {steps.map((step) => (
                                <SwiperSlide key={step.n}>
                                    <Card
                                        sx={{
                                            height: "100%",
                                            minHeight: 220,
                                            bgcolor: "#1e2d3d",
                                            border: "1px solid rgba(0, 188, 138, 0.15)",
                                            borderRadius: 3,
                                            p: 3,
                                        }}
                                    >
                                        <Box
                                            className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full font-bold"
                                            sx={{
                                                bgcolor: "var(--primary-color)",
                                                color: "#0a1629",
                                            }}
                                        >
                                            {step.n}
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                            {step.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.88, lineHeight: 1.7 }}>
                                            {step.text}
                                        </Typography>
                                    </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Box>
                </Container>
            </Box>

            <Box
                id="testimonials"
                sx={{
                    py: { xs: 8, md: 12 },
                    backgroundColor: "color-mix(in srgb, var(--background-color) 88%, #ffffff 4%)",
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h4"
                        component="h2"
                        className="text-center font-bold mb-10"
                        data-aos="fade-up"
                    >
                        Trusted voices
                    </Typography>
                    <Box
                        sx={{
                            "& .swiper-pagination-bullet-active": {
                                background: "var(--primary-color)",
                            },
                            "& .swiper-pagination-bullet": {
                                background: "color-mix(in srgb, var(--text-color) 35%, transparent)",
                            },
                        }}
                    >
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            slidesPerView={1}
                            spaceBetween={24}
                            loop
                            autoplay={{ delay: 5500 }}
                            pagination={{ clickable: true }}
                            centeredSlides
                        >
                            {testimonials.map((t) => (
                                <SwiperSlide key={t.name}>
                                    <Card
                                        data-aos="fade-up"
                                        sx={{
                                            mx: "auto",
                                            maxWidth: 520,
                                            bgcolor: "rgba(30, 45, 61, 0.85)",
                                            border: "1px solid rgba(0, 188, 138, 0.14)",
                                            borderRadius: 3,
                                            p: 4,
                                            textAlign: "center",
                                        }}
                                    >
                                        <Box
                                            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold"
                                            sx={{
                                                bgcolor: "var(--secondary-color)",
                                                color: "var(--primary-color)",
                                            }}
                                        >
                                            {t.initials}
                                        </Box>
                                        <Typography variant="body1" sx={{ fontStyle: "italic", lineHeight: 1.8, mb: 2 }}>
                                            “{t.quote}”
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            {t.name}
                                        </Typography>
                                        <Typography variant="caption" sx={{ opacity: 0.75 }}>
                                            {t.role}
                                        </Typography>
                                    </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Box>
                </Container>
            </Box>

            <Box
                component="section"
                data-aos="zoom-in"
                sx={{
                    py: { xs: 8, md: 11 },
                    px: 2,
                    backgroundColor: "var(--secondary-color)",
                }}
            >
                <Container maxWidth="md" className="text-center">
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                        Ready to modernize evaluations?
                    </Typography>
                    <Typography className="mb-6 opacity-90">
                        Deploy the same workflows your faculty trusts—without another patchwork of tools.
                    </Typography>
                    <Button
                        component={Link}
                        to="/auth"
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: "var(--primary-color)",
                            color: "#0a1629",
                            fontWeight: 700,
                            textTransform: "none",
                            px: 5,
                            py: 1.5,
                            borderRadius: 2,
                            "&:hover": { bgcolor: "var(--primary-color)", opacity: 0.93 },
                        }}
                    >
                        Create your account
                    </Button>
                </Container>
            </Box>

            <Box
                component="footer"
                sx={{
                    pt: 8,
                    pb: 3,
                    px: 2,
                    bgcolor: "var(--background-color)",
                    borderTop: "3px solid var(--primary-color)",
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={6} className="mb-10">
                        <Grid item xs={12} md={4}>
                            <Box className="flex items-center gap-2 mb-3">
                                <SchoolIcon sx={{ color: "var(--primary-color)" }} />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Evaluate It Easily
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ opacity: 0.85, maxWidth: 300 }}>
                                Internal evaluation hub for graduation projects—secure, traceable, and fast.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                                Quick links
                            </Typography>
                            <Box className="flex flex-col gap-2">
                                <a href="#features" className="no-underline text-sm hover:underline" style={{ color: "var(--text-color)" }}>
                                    Features
                                </a>
                                <a href="#how" className="no-underline text-sm hover:underline" style={{ color: "var(--text-color)" }}>
                                    How it works
                                </a>
                                <Link to="/about" className="no-underline text-sm hover:underline" style={{ color: "var(--text-color)" }}>
                                    About
                                </Link>
                                <Link to="/auth" className="no-underline text-sm hover:underline" style={{ color: "var(--text-color)" }}>
                                    Sign in
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                                Contact
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.85 }}>
                                IT Support: support@university.edu
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.85, mt: 1 }}>
                                Admin desk: Mon–Fri, 9:00–17:00
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box
                        className="border-t pt-4 text-center"
                        sx={{ borderColor: "rgba(0, 188, 138, 0.15)" }}
                    >
                        <Typography variant="caption" sx={{ opacity: 0.7 }}>
                            © {new Date().getFullYear()} Evaluate It Easily. All rights reserved.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
