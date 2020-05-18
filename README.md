# generic-grid-connected-to-redux
A generic grid that is directly connected to redux

## Premises

- The grid will be connected to state through redux;
- The grid can show different data types (i.e. user, messages, log, etc.);
- The grid will differ instances, even if it points to the same kind of data (i.e. i can have 2+ user grid in different places of app - some state in one can be different from another);
- The state of the app will be normalized;
