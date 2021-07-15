@isTest
private class BindingControllerTest {
    @isTest
    static void constructor_setsDefaultValue() {
        // GIVEN - WHEN
        BindingController controller = new BindingController();

        // THEN
        System.assertEquals(controller.courseName, 'Default');
    }
}
