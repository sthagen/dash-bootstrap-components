import dash_bootstrap_components as dbc
from dash import html

row = html.Div(
    [
        dbc.Row(
            [
                dbc.Col(html.Div("One of three columns")),
                dbc.Col(html.Div("One of three columns")),
                dbc.Col(html.Div("One of three columns")),
            ],
            align="start",
        ),
        dbc.Row(
            [
                dbc.Col(html.Div("One of three columns")),
                dbc.Col(html.Div("One of three columns")),
                dbc.Col(html.Div("One of three columns")),
            ],
            align="center",
        ),
        dbc.Row(
            [
                dbc.Col(html.Div("One of three columns")),
                dbc.Col(html.Div("One of three columns")),
                dbc.Col(html.Div("One of three columns")),
            ],
            align="end",
        ),
        dbc.Row(
            [
                dbc.Col(html.Div("One of three columns"), align="start"),
                dbc.Col(html.Div("One of three columns"), align="center"),
                dbc.Col(html.Div("One of three columns"), align="end"),
            ]
        ),
    ],
    className="pad-row",
)
