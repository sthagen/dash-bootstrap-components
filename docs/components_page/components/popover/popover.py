import dash_bootstrap_components as dbc
from dash import html

popover_children = [
    dbc.PopoverHeader("Popover header"),
    dbc.PopoverBody("And here's some amazing content. Cool!"),
]

popovers = html.Div(
    [
        dbc.Button(
            "Click",
            id="click-target",
            color="danger",
            className="me-1",
            n_clicks=0,
        ),
        dbc.Popover(
            popover_children,
            id="click",
            target="click-target",
            trigger="click",
        ),
        dbc.Button(
            "Focus",
            id="focus-target",
            color="danger",
            className="me-1",
            n_clicks=0,
        ),
        dbc.Popover(
            popover_children,
            id="focus",
            target="focus-target",
            trigger="focus",
        ),
        dbc.Button(
            "Hover",
            id="hover-target",
            color="danger",
            className="me-1",
            n_clicks=0,
        ),
        dbc.Popover(
            popover_children,
            id="hover",
            target="hover-target",
            trigger="hover",
        ),
        dbc.Button("Legacy", id="legacy-target", color="danger", n_clicks=0),
        dbc.Popover(
            popover_children,
            id="legacy",
            target="legacy-target",
            trigger="legacy",
        ),
    ]
)
