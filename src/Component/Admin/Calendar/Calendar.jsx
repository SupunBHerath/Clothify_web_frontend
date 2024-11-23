import React from 'react';
import { Calendar, theme } from 'antd';
const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};
const CalendarDiv = () => {
    const { token } = theme.useToken();
    const wrapperStyle = {
        width: 300,
        // transform: "scale(0.5)",
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };
    return (
        <div style={wrapperStyle}>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </div>
    );
};
export default CalendarDiv;