import { Box, CircularProgress, useTheme } from "@mui/material";
import { tokens } from "../../theme";

export default function UploadOverlay({ progress }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <div className="fixed inset-0 bg-[#00000019] backdrop-blur-sm bg-opacity-70 z-50 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center p-8 rounded-xl border" style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[800]}}>

                <Box position="relative" display="inline-flex">
                    {/* Background circle */}
                    <CircularProgress
                        variant="determinate"
                        value={100}
                        size={100}
                        sx={{ color: "#444" }}
                    />

                    {/* Progress circle */}
                    <CircularProgress
                        variant="determinate"
                        value={progress}
                        size={100}
                        sx={{
                            position: "absolute",
                            left: 0,
                            color: "#4cceac",
                        }}
                    />

                    {/* Percentage text */}
                    <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <span style={{ color: "white", fontWeight: "bold" }}>
                            {progress}%
                        </span>
                    </Box>
                </Box>

                {/* Bottom text */}
                <p className="mt-6 text-sm text-red-500">
                    Please don't refresh the page
                </p>
            </div>
        </div>
    );
};