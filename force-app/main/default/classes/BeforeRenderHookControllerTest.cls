@isTest
private class BeforeRenderHookControllerTest {
    @isTest
    static void populateCourses_sets3Courses() {
        // GIVEN
        BeforeRenderHookController controller = new BeforeRenderHookController();

        // WHEN
        controller.populateCourses();

        // THEN
        List<String> expectedCourses = new List<String>{
            'Irrigation Systems',
            'Soils',
            'Organic Crops'
        };
        System.assertEquals(
            expectedCourses,
            controller.courses,
            'Courses where not correctly populated'
        );
    }
}
