@extends('layouts.front')

@section('content')
    <section class="common-hero type-banner">
        <div class="section-container">
            <div class="custom-container">
                <div class="text-container center">
                    <div class="section-title">
                        <h1 class="type-white">Cart</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="custom-container">
        <div class="common-layout-container">
            <div class="layout-item">
                <div class="inner">
                    <div class="section-title">
                        <h3>Cart</h3>
                    </div>
                    <div class="common-details-container section-body">
                        <form action="" method="post">
                            <table class="common-cart-table type-cart">
                                <thead>
                                <tr>
                                    <th>Products</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                                </thead>

                                <tbody id="cart-item-container">

                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
            <div class="layout-item">
                <div class="inner">
                    <div class="common-billing-container">
                        <div class="billing-inner-container">
                            <div class="billing-item">
                                <div class="section-title">
                                    <h3>Cart Total</h3>
                                </div>
                            </div>
                            <div class="billing-item">
                                <div class="content">
                                    <ul>
                                        <li><span>Sub Total</span> <span id="subtotal"></span></li>
                                        <li><span>VAT</span> <span id="vat">13%</span></li>
                                        <li><span>Total</span> <span id="total"></span></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="billing-item">
                                <div class="title">
                                    <h3 >Payment Method</h3>
                                </div>
                                <div class="content">
                                    <form action="#" class="billing-radio">
                                        @if(isset($payment_methods))
                                        @foreach($payment_methods as $key => $method)
                                        <p>
                                            <input type="radio" id="pay-{{ $key }}" value="{{ $method->id }}" name="payment-method" {{ $key===0 ? 'checked' : '' }}>
                                            <label for="pay-{{ $key }}">{{ $method->name }}</label>
                                        </p>
                                        @endforeach
                                        @endif
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="action-container">
                            <ul>
                                <li>
                                    <a href="javascript:void(0)" onclick="checkout()" class="co-btn type-fill full-width">Checkout</a>
                                </li>
                                <li><a href="/menu" class="co-btn type-fill-transparent full-width">Continue Shopping</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('script')

    <script>
        let items = [];

        $(document).ready(function(){
            getCartItems();
            $('.input-quantity').change(function(e){
                console.log(e)
            });
        });

        // function removeCartItem(index){
        //     let product = items[index].pivot.product_id;
        //
        //     if(confirm("Are you sure?")){
        //         $.ajax({
        //             url: /delete_cart_item/${product},
        //             type: 'GET',
        //             success: function (response) {
        //                 getCartItems();
        //             },
        //             error: function (xhr, ajaxOptions, thrownError) {
        //                 Swal.fire({
        //                     icon: 'error',
        //                     title: 'Remove From Cart',
        //                     text: 'Something went wrong..!!',
        //                 })
        //             }
        //         });
        //     }
        // }

        function calculate(index){
            const item_detail = items[index];

            let item_total_price_container = $('#item-total-' + index);
            let quantity = $('#quantity-' + index).val();

            item_total_price_container.html('Rs ' + (item_detail.price * quantity));

            calculateTotal()
        }

        function calculateTotal(){
            let subtotal = 0;

            items.forEach(function(item,index){
                let quantity = $('#quantity-' + index).val();
                let price = item.price;

                subtotal += (quantity * price)
            });

            let tax_included_total = subtotal + 0.13 * subtotal;

            $('#subtotal').html('Rs ' + subtotal);
            $('#total').html('Rs ' + tax_included_total);

        }

        function getCartItems(){


            $.ajax({
                url: /getCartItems,
                type: 'GET',
                success: function(response){
                    let html = "";
                    items = response.data;

                    if(items.length === 0){
                        html = `<tr>
                        <td colspan="5" style="text-align: center">No product added to cart</td>
                                </tr>`;
                    }

                    response.data.forEach(function(item,index,arr){
                        let row = `<tr id="row-${index}">
                                    <td>
                                        <div class="cart-table-container">
                                            <div class="cart-table-item">
                                                <div class="remove-cart">
                                                    <i class="fa-solid fa-xmark" onclick="deleteItem(${index})"></i>
                                                </div>
                                            </div>
                                            <div class="cart-table-item">
                                                <div class="image-container">
                                                    <a href="#">
                                                        <img src="{{ asset('storage/uploads/products')  . '/' }}${item.thumbnail}" alt="" title="">
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="cart-table-item">
                                                <ul>
                                                    <li>
                                                        <a href="#">${item.name}</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-title="Quantity" class="type-quantity">
                                        <div class="td-inner">
                                            <div class="common-quantity-option type-small">
                                                <div class="qty-item type-left">
                                                    <a class="minus" href="javascript:void(0);" onclick="toggleQuantity(${index},${false})">
                                                        <i class="fa-solid fa-minus"></i>
                                                    </a>
                                                </div>
                                                <div class="qty-item">
                                                    <input type="hidden" name="product_id[]" value="${item.id}"/>
                                                    <input name="quantity[]" id="quantity-${index}" type="number" class="input-text tc" value="${item.quantity}">
                                                </div>
                                                <div class="qty-item type-right" >
                                                    <a class="plus" href="javascript:void(0)" onclick="toggleQuantity(${index})">
                                                        <i class="fa-solid fa-plus"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <span class="input-group-btn">
                              <button type="submit" data-toggle="tooltip" title="" class="btn"><i class="fa fa-refresh"></i></button>
                            </span>
                                        </div>
                                    </td>
                                    <td data-title="Total">
                                    <span id="item-total-${index}" >
                                        ${ item.quantity * item.price}</span>
                        </td>
                    </tr>`;

                        html += row;

                    });
                    $('#cart-item-container').html(html);
                    calculateTotal();
                },
                error: function(xhr, ajaxOptions, thrownError){

                }
            });
        }

        function toggleQuantity(row_id,increase=true){

            let quantity = $('#quantity-' + row_id).val();

            if(quantity <= 1 && !increase)
                return false;

            if(increase)
                $('#quantity-' + row_id).val(parseInt(quantity) + 1)
            else
                $('#quantity-' + + row_id).val(parseInt(quantity) - 1)

            calculate(row_id);
        }

        function deleteItem(row_id){
            let product = items[row_id];
            console.log(product);
            $.ajax({
                url: /cart/delete,
                type: 'POST',
                headers: {
                    'X-CSRF-Token': '{{ csrf_token() }}'
                },
                data:{
                    product_id: product.id,
                },
                success: function(response){
                    $('#row-' + row_id).remove();
                    items.splice(row_id, 1);
                    calculateTotal()
                },
                error: function(){
                    Swal.fire(
                        'Error!',
                        'Problem removing cart item.',
                        'error'
                    )
                }
            });

        }

        function checkout(){
            let products = $("input[name='product_id[]']").map(function(item
            ){
                return $(this).val();
            }).get();

            let quantity = $("input[name='quantity[]']").map(function(item){
                return $(this).val();
            }).get();

            let payment_method = $("input[name='payment-method']:checked").val()

            if(!products.length){
                Swal.fire('No products in your cart');
                return false;
            }

            $.ajax({
                url: /checkout,
                type: 'POST',
                headers: {
                    'X-CSRF-Token': '{{ csrf_token() }}'
                },
                data:{
                    products: products,
                    quantity: quantity,
                    payment_method: payment_method,
                    //latitude and longitude here
                },
                success: function(response){
                    Swal.fire({
                        text: "Your order has been placed successully. Please check your mail.",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Okay",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    }).then(function(result) {
                        window.location = '/';
                    });
                },
                error: function(){
                    Swal.fire({
                        text: "Problem placing your order. Please try again",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Okay",
                        customClass: {
                            confirmButton: "btn btn-danger"
                        }
                    })
                }
            });

        }

    </script>
@endsection
