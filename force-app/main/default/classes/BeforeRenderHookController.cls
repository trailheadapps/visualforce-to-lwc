public with sharing class BeforeRenderHookController {
    public List<String> courses { get; private set; }

    public void populateCourses() {
        // Typically this list would be constructed with SOQL
        courses = new List<String>{
            'Irrigation Systems',
            'Soils',
            'Organic Crops'
        };
    }
}
