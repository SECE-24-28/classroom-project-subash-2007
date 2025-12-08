let isLogin = true;
let currentUser = null;
let selectedOperator = null;
let selectedPlan = null;
let paymentMethod = 'upi';

const plans = {
    Airtel: [
        { price: 199, validity: '28 days', data: '2GB/day', calls: 'Unlimited' },
        { price: 299, validity: '28 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 399, validity: '56 days', data: '2GB/day', calls: 'Unlimited' },
        { price: 479, validity: '56 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 549, validity: '84 days', data: '2GB/day', calls: 'Unlimited' },
        { price: 666, validity: '84 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 719, validity: '84 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 839, validity: '84 days', data: '2GB/day', calls: 'Unlimited' },
        { price: 999, validity: '84 days', data: '2.5GB/day', calls: 'Unlimited' },
        { price: 1799, validity: '365 days', data: '24GB', calls: 'Unlimited' }
    ],
    Jio: [
        { price: 209, validity: '28 days', data: '1GB/day', calls: 'Unlimited' },
        { price: 239, validity: '28 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 299, validity: '28 days', data: '2GB/day', calls: 'Unlimited' },
        { price: 349, validity: '28 days', data: '2.5GB/day', calls: 'Unlimited' },
        { price: 533, validity: '56 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 601, validity: '84 days', data: '1GB/day', calls: 'Unlimited' },
        { price: 719, validity: '84 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 999, validity: '84 days', data: '2GB/day', calls: 'Unlimited' },
        { price: 1559, validity: '336 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 2999, validity: '365 days', data: '2.5GB/day', calls: 'Unlimited' }
    ],
    Vi: [
        { price: 179, validity: '28 days', data: '1GB/day', calls: 'Unlimited' },
        { price: 269, validity: '28 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 299, validity: '28 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 359, validity: '28 days', data: '2GB/day', calls: 'Unlimited' },
        { price: 479, validity: '56 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 539, validity: '56 days', data: '2GB/day', calls: 'Unlimited' },
        { price: 719, validity: '84 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 839, validity: '84 days', data: '2GB/day', calls: 'Unlimited' },
        { price: 1799, validity: '365 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 2899, validity: '365 days', data: '2GB/day', calls: 'Unlimited' }
    ],
    BSNL: [
        { price: 107, validity: '28 days', data: '1GB/day', calls: 'Unlimited' },
        { price: 153, validity: '28 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 187, validity: '28 days', data: '2GB/day', calls: 'Unlimited' },
        { price: 319, validity: '56 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 397, validity: '84 days', data: '1GB/day', calls: 'Unlimited' },
        { price: 485, validity: '90 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 666, validity: '135 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 797, validity: '180 days', data: '1.5GB/day', calls: 'Unlimited' },
        { price: 1498, validity: '300 days', data: '2GB/day', calls: 'Unlimited' },
        { price: 1999, validity: '365 days', data: '2GB/day', calls: 'Unlimited' }
    ]
};

function showAuth() {
    hideAll();
    document.getElementById('authPage').classList.remove('hidden');
}

function toggleAuth() {
    isLogin = !isLogin;
    document.getElementById('authTitle').textContent = isLogin ? 'Login' : 'Sign Up';
    document.getElementById('authToggle').textContent = isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login';
}

function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('Please fill all fields');
        return;
    }
    
    if (!email.includes('@')) {
        alert('Please enter a valid email');
        return;
    }
    
    currentUser = email;
    showRecharge();
}

function showRecharge() {
    hideAll();
    document.getElementById('rechargePage').classList.remove('hidden');
    document.getElementById('plansSection').classList.add('hidden');
    selectedOperator = null;
    selectedPlan = null;
}

function selectOperator(operator) {
    selectedOperator = operator;
    document.querySelectorAll('.operator').forEach(op => op.classList.remove('selected'));
    event.target.closest('.operator').classList.add('selected');
    
    const mobile = document.getElementById('mobileNumber').value;
    if (mobile.length !== 10) {
        alert('Please enter a valid 10-digit mobile number');
        return;
    }
    
    displayPlans(operator);
}

function displayPlans(operator) {
    const plansSection = document.getElementById('plansSection');
    const plansList = document.getElementById('plansList');
    
    plansList.innerHTML = '';
    plans[operator].forEach((plan, index) => {
        const planDiv = document.createElement('div');
        planDiv.className = 'plan';
        planDiv.onclick = () => selectPlan(plan, planDiv);
        planDiv.innerHTML = `
            <div class="plan-header">
                <span class="plan-price">₹${plan.price}</span>
                <span class="plan-validity">${plan.validity}</span>
            </div>
            <div class="plan-details">${plan.data} | ${plan.calls} Calls</div>
        `;
        plansList.appendChild(planDiv);
    });
    
    plansSection.classList.remove('hidden');
}

function selectPlan(plan, element) {
    selectedPlan = plan;
    document.querySelectorAll('.plan').forEach(p => p.classList.remove('selected'));
    element.classList.add('selected');
    
    setTimeout(() => showPayment(), 300);
}

function selectPaymentMethod(method) {
    paymentMethod = method;
    document.querySelectorAll('.payment-method').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (method === 'upi') {
        document.getElementById('upiSection').classList.remove('hidden');
        document.getElementById('cardSection').classList.add('hidden');
    } else {
        document.getElementById('upiSection').classList.add('hidden');
        document.getElementById('cardSection').classList.remove('hidden');
    }
}

function showPayment() {
    const mobile = document.getElementById('mobileNumber').value;
    
    if (!mobile || !selectedOperator || !selectedPlan) {
        alert('Please complete all selections');
        return;
    }
    
    hideAll();
    document.getElementById('paymentPage').classList.remove('hidden');
    document.getElementById('payMobile').textContent = mobile;
    document.getElementById('payOperator').textContent = selectedOperator;
    document.getElementById('payPlan').textContent = `${selectedPlan.data} | ${selectedPlan.validity}`;
    document.getElementById('payAmount').textContent = selectedPlan.price;
    
    paymentMethod = 'upi';
    document.getElementById('upiSection').classList.remove('hidden');
    document.getElementById('cardSection').classList.add('hidden');
    document.querySelectorAll('.payment-method').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.payment-method')[0].classList.add('active');
}

function processPayment() {
    if (paymentMethod === 'upi') {
        const upiId = document.getElementById('upiId').value;
        if (!upiId || !upiId.includes('@')) {
            alert('Please enter a valid UPI ID');
            return;
        }
    } else {
        const cardNumber = document.getElementById('cardNumber').value;
        const cvv = document.getElementById('cvv').value;
        
        if (!cardNumber || !cvv) {
            alert('Please fill all payment details');
            return;
        }
        
        if (cardNumber.length !== 16 || cvv.length !== 3) {
            alert('Invalid card details');
            return;
        }
    }
    
    const transaction = {
        mobile: document.getElementById('mobileNumber').value,
        operator: selectedOperator,
        plan: `${selectedPlan.data} | ${selectedPlan.validity}`,
        amount: selectedPlan.price,
        paymentMethod: paymentMethod.toUpperCase(),
        date: new Date().toLocaleString(),
        status: 'Success'
    };
    
    let history = JSON.parse(localStorage.getItem('rechargeHistory') || '[]');
    history.unshift(transaction);
    localStorage.setItem('rechargeHistory', JSON.stringify(history));
    
    alert('Payment Successful! Recharge completed.');
    
    document.getElementById('mobileNumber').value = '';
    document.getElementById('upiId').value = '';
    document.getElementById('cardNumber').value = '';
    document.getElementById('cvv').value = '';
    
    showRecharge();
}

function showHistory() {
    hideAll();
    document.getElementById('historyPage').classList.remove('hidden');
    
    const historyList = document.getElementById('historyList');
    const history = JSON.parse(localStorage.getItem('rechargeHistory') || '[]');
    
    if (history.length === 0) {
        historyList.innerHTML = '<div class="empty-history">No recharge history found</div>';
        return;
    }
    
    historyList.innerHTML = '';
    history.forEach(item => {
        const historyDiv = document.createElement('div');
        historyDiv.className = 'history-item';
        historyDiv.innerHTML = `
            <p><strong>Mobile:</strong> ${item.mobile}</p>
            <p><strong>Operator:</strong> ${item.operator}</p>
            <p><strong>Plan:</strong> ${item.plan}</p>
            <p><strong>Amount:</strong> ₹${item.amount}</p>
            <p><strong>Payment:</strong> ${item.paymentMethod}</p>
            <p><strong>Date:</strong> ${item.date}</p>
            <p class="success">Status: ${item.status}</p>
        `;
        historyList.appendChild(historyDiv);
    });
}

function hideAll() {
    document.querySelectorAll('.container').forEach(container => {
        container.classList.add('hidden');
    });
}
