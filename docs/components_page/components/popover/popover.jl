using DashBootstrapComponents

popover_children = "I am a popover!";

popovers = html_div([
    dbc_button(
        "Click",
        id = "click-target",
        color = "danger",
        className = "me-1",
        n_clicks = 0,
    ),
    dbc_popover(popover_children, target = "click-target", body = true, trigger = "click"),
    dbc_button(
        "Focus",
        id = "focus-target",
        color = "danger",
        className = "me-1",
        n_clicks = 0,
    ),
    dbc_popover(popover_children, target = "focus-target", body = true, trigger = "focus"),
    dbc_button(
        "Hover",
        id = "hover-target",
        color = "danger",
        className = "me-1",
        n_clicks = 0,
    ),
    dbc_popover(popover_children, target = "hover-target", body = true, trigger = "hover"),
    dbc_button("Legacy", id = "legacy-target", color = "danger", n_clicks = 0),
    dbc_popover(
        popover_children,
        target = "legacy-target",
        body = true,
        trigger = "legacy",
    ),
]);
