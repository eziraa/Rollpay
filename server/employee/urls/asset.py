from django.urls import path

from employee.views.assets import AddAssetToEmployee, AssetDetail, AssetList

urlpatterns = [
    path('<employee_id>/add-asset', AddAssetToEmployee.as_view(), name='add-asset-to-employee'),
    path('list', AssetList.as_view(), name='asset-list'),
    path('assets/<asset_id>', AssetDetail.as_view(), name='asset-detail'),
]