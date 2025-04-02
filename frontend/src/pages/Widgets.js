import React, { useState } from "react";
import TopPromptInput from "../components/TopPromptInput";
import WidgetDisplay from "../components/WidgetDisplay";

const Widgets = () => {
    const [widgets, setWidgets] = useState([]);

    const onSubmit = (data) => {
      setWidgets(data);
    };

    return (
        <div className="flex-1 flex flex-col">
        <TopPromptInput onSubmit={onSubmit}/>
        <WidgetDisplay data={widgets}/>
      </div>
    )
}

export default Widgets;