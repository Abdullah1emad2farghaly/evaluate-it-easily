import { Box, Typography, Container, Grid, Button, Card, CardContent } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import InsightsIcon from "@mui/icons-material/Insights";
import FlagIcon from "@mui/icons-material/Flag";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const teamMembers = [
    { initials: "N.A.", name: "Nadia Ali", role: "Product lead" },
    { initials: "O.H.", name: "Omar Hassan", role: "Engineering" },
    { initials: "L.S.", name: "Layla Samir", role: "Academic partnerships" },
    { initials: "K.M.", name: "Karim Mostafa", role: "Support" },
];

export default function About() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "var(--background-color)",
                color: "var(--text-color)",
            }}
        >
            <Box
                className="relative overflow-hidden"
                sx={{
                    pt: { xs: 12, md: 16 },
                    pb: { xs: 6, md: 8 },
                    background:
                        "linear-gradient(180deg, color-mix(in srgb, var(--secondary-color) 55%, var(--background-color)) 0%, var(--background-color) 100%)",
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="body2"
                        className="mb-3"
                        data-aos="fade-down"
                        sx={{ color: "color-mix(in srgb, var(--text-color) 70%, transparent)" }}
                    >
                        <Link to="/" className="no-underline hover:underline" style={{ color: "var(--primary-color)" }}>
                            Home
                        </Link>
                        <span className="mx-2 opacity-50">/</span>
                        <span>About</span>
                    </Typography>
                    <Typography
                        variant="h3"
                        component="h1"
                        className="font-bold tracking-tight"
                        data-aos="fade-up"
                        sx={{ fontSize: { xs: "2rem", md: "2.75rem" } }}
                    >
                        About Evaluate It Easily
                    </Typography>
                    <Typography
                        className="mt-3 max-w-2xl"
                        data-aos="fade-up"
                        data-aos-delay="80"
                        sx={{ color: "color-mix(in srgb, var(--text-color) 82%, transparent)" }}
                    >
                        We connect students, supervisors, and committees on one secure platform—so evaluation stays fair, fast, and fully traceable.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
                <Box
                    className="text-center"
                    data-aos="fade-up"
                    sx={{
                        px: { xs: 1, sm: 4 },
                        py: 4,
                        borderRadius: 3,
                        border: "1px solid rgba(0, 188, 138, 0.2)",
                        bgcolor: "rgba(41, 59, 85, 0.25)",
                    }}
                >
                    <Box
                        className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                        sx={{ bgcolor: "rgba(0, 188, 138, 0.15)", color: "var(--primary-color)" }}
                    >
                        <FlagIcon sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                        Our mission
                    </Typography>
                    <Typography sx={{ lineHeight: 1.85, color: "color-mix(in srgb, var(--text-color) 88%, transparent)" }}>
                        Give every faculty a single source of truth for graduation projects—transparent submissions, consistent rubrics, and analytics that respect academic integrity.
                    </Typography>
                </Box>
            </Container>

            <Box
                sx={{
                    py: { xs: 6, md: 12 },
                    bgcolor: "color-mix(in srgb, var(--background-color) 75%, #ffffff 6%)",
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        component="h2"
                        className="text-center font-bold mb-2"
                        data-aos="fade-up"
                    >
                        Everything in One Platform
                    </Typography>
                    <Typography
                        className="text-center mb-10 max-w-2xl mx-auto"
                        data-aos="fade-up"
                        data-aos-delay="60"
                        sx={{ color: "color-mix(in srgb, var(--text-color) 75%, transparent)" }}
                    >
                        Three connected experiences—built for students, admins, and leadership—sharing the same live data.
                    </Typography>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Card
                                data-aos="fade-up"
                                elevation={0}
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    bgcolor: "#1e2d3d",
                                    borderTop: "3px solid var(--primary-color)",
                                    borderRadius: 2,
                                    transition:
                                        "transform 0.35s ease, box-shadow 0.35s ease",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: "0 20px 48px rgba(0, 188, 138, 0.28)",
                                    },
                                }}
                            >
                                <CardContent className="flex flex-1 flex-col p-6">
                                    <Box
                                        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                                        sx={{
                                            bgcolor: "rgba(0, 188, 138, 0.15)",
                                            color: "var(--primary-color)",
                                        }}
                                    >
                                        <AssignmentIcon sx={{ fontSize: 32 }} />
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                                        Submit with Ease
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        className="mb-6 flex-1"
                                        sx={{ lineHeight: 1.75, opacity: 0.9 }}
                                    >
                                        Users can submit forms, track status, and get instant feedback.
                                    </Typography>
                                    <Button
                                        component={Link}
                                        to="/auth"
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            bgcolor: "var(--primary-color)",
                                            color: "#0a1629",
                                            fontWeight: 700,
                                            textTransform: "none",
                                            "&:hover": { bgcolor: "var(--primary-color)", opacity: 0.92 },
                                        }}
                                    >
                                        Learn More
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card
                                data-aos="fade-up"
                                data-aos-delay="100"
                                elevation={0}
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    bgcolor: "#1e2d3d",
                                    borderTop: `3px solid ${colors.greenAccent[500]}`,
                                    boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${colors.greenAccent[500]} 45%, transparent)`,
                                    borderRadius: 2,
                                    transition:
                                        "transform 0.35s ease, box-shadow 0.35s ease",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: `0 20px 48px color-mix(in srgb, ${colors.greenAccent[500]} 35%, transparent)`,
                                    },
                                }}
                            >
                                <CardContent className="flex flex-1 flex-col p-6">
                                    <Box
                                        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                                        sx={{
                                            bgcolor: "var(--secondary-color)",
                                            color: colors.greenAccent[500],
                                            border: `2px solid ${colors.greenAccent[500]}`,
                                        }}
                                    >
                                        <AdminPanelSettingsIcon sx={{ fontSize: 32 }} />
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                                        Powerful Admin Panel
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        className="mb-6 flex-1"
                                        sx={{ lineHeight: 1.75, opacity: 0.9 }}
                                    >
                                        Full control over submissions, user management, analytics and reports.
                                    </Typography>
                                    <Button
                                        component={Link}
                                        to="/admin"
                                        variant="outlined"
                                        fullWidth
                                        sx={{
                                            borderColor: colors.greenAccent[500],
                                            color: colors.greenAccent[500],
                                            fontWeight: 700,
                                            textTransform: "none",
                                            "&:hover": {
                                                borderColor: colors.greenAccent[500],
                                                bgcolor: "rgba(5, 229, 169, 0.08)",
                                            },
                                        }}
                                    >
                                        Admin Login
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card
                                data-aos="fade-up"
                                data-aos-delay="200"
                                elevation={0}
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    bgcolor: "#1e2d3d",
                                    borderRadius: 2,
                                    borderTop: "3px solid transparent",
                                    backgroundImage:
                                        "linear-gradient(#1e2d3d, #1e2d3d), linear-gradient(120deg, var(--primary-color), var(--secondary-color))",
                                    backgroundOrigin: "border-box",
                                    backgroundClip: "padding-box, border-box",
                                    border: "3px solid transparent",
                                    transition:
                                        "transform 0.35s ease, box-shadow 0.35s ease",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow:
                                            "0 20px 48px rgba(0, 188, 138, 0.2), 0 0 32px rgba(41, 59, 85, 0.6)",
                                    },
                                }}
                            >
                                <CardContent className="flex flex-1 flex-col p-6">
                                    <Box
                                        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                                        sx={{
                                            background:
                                                "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
                                            color: "var(--text-color)",
                                        }}
                                    >
                                        <InsightsIcon sx={{ fontSize: 32 }} />
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                                        Real-time Analytics
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        className="mb-6 flex-1"
                                        sx={{ lineHeight: 1.75, opacity: 0.9 }}
                                    >
                                        Visual dashboards, export reports, track KPIs across all submissions.
                                    </Typography>
                                    <Button
                                        component={Link}
                                        to="/dashboard"
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            background:
                                                "linear-gradient(90deg, var(--primary-color), var(--secondary-color))",
                                            color: "var(--text-color)",
                                            fontWeight: 700,
                                            textTransform: "none",
                                            "&:hover": {
                                                opacity: 0.95,
                                            },
                                        }}
                                    >
                                        View Demo
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
                <Typography
                    variant="h5"
                    className="text-center font-bold mb-8"
                    data-aos="fade-up"
                >
                    Team behind the platform
                </Typography>
                <Grid container spacing={3}>
                    {teamMembers.map((m, i) => (
                        <Grid item xs={12} sm={6} md={3} key={m.name}>
                            <Card
                                data-aos="fade-up"
                                data-aos-delay={i * 80}
                                elevation={0}
                                sx={{
                                    bgcolor: "rgba(30, 45, 61, 0.75)",
                                    border: "1px solid rgba(0, 188, 138, 0.12)",
                                    borderRadius: 2,
                                    textAlign: "center",
                                    py: 3,
                                }}
                            >
                                <Box
                                    className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold"
                                    sx={{
                                        bgcolor: "var(--secondary-color)",
                                        color: "var(--primary-color)",
                                    }}
                                >
                                    {m.initials}
                                </Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    {m.name}
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.75 }}>
                                    {m.role}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Box
                sx={{
                    py: { xs: 6, md: 10 },
                    borderTop: "1px solid rgba(0, 188, 138, 0.12)",
                    borderBottom: "1px solid rgba(0, 188, 138, 0.12)",
                    bgcolor: "rgba(41, 59, 85, 0.2)",
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        {[
                            { value: "1200+", label: "Submissions" },
                            { value: "300+", label: "Users" },
                            { value: "50+", label: "Admins" },
                            { value: "99%", label: "Uptime" },
                        ].map((stat, i) => (
                            <Grid item xs={6} md={3} key={stat.label}>
                                <Box
                                    className="text-center py-4"
                                    data-aos="fade-up"
                                    data-aos-delay={i * 100}
                                >
                                    <Typography
                                        variant="h4"
                                        sx={{ fontWeight: 800, color: "var(--primary-color)" }}
                                    >
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
