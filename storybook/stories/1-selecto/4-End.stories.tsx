import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";
import { withPreview, DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";
import Selecto from "react-selecto";
import "../index.css";
import { WELCOME_CSS_PREVIEW, WELCOME_REACT_PREVIEW } from "../preview/Welcom.preview";

const story = storiesOf("Selecto", module).addDecorator(withKnobs).addDecorator(withPreview);

story.add("Only select at end.", () => {
    return <App />;
}, {
    preview: [
        // {
        //     tab: "HTML",
        //     template: NORMAL_HTML_TEMPLATE,
        //     language: "html",
        // },
        {
            tab: "CSS",
            template: WELCOME_CSS_PREVIEW,
            language: "css",
        },
    ],
});

function App() {
    const cubes: number[] = [];

    for (let i = 0; i < 64; ++i) {
        cubes.push(i);
    }
    return <div className="app">
        <div className="container">
            <div className="logo" id="logo">
                <img src="https://daybrush.com/selecto/images/256x256.png" />
            </div>
            <h1>Only select at end.</h1>
            <p className="description">You can select the target through the <strong>selectEnd</strong> event.</p>

            <Selecto
                dragContainer={window}
                selectableTargets={["#selecto1 .cube", "#selecto2 .element", "#selecto3 li"]}
                onSelectEnd={e => {
                    e.added.forEach(el => {
                        el.classList.add("selected");
                    });
                    e.removed.forEach(el => {
                        el.classList.remove("selected");
                    });
                }}
                hitRate={number("hitRate", 100)}
                selectByClick={boolean("selectByClick", true)}
                selectFromInside={boolean("selectFromInside", true)}
            ></Selecto>
             <div className="elements selecto-area" id="selecto1">
                {cubes.map(i => <div className="cube" key={i}></div>)}
            </div>
            <div className="empty elements"></div>
        </div>
    </div>;
}